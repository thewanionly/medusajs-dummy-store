import {
  CreateProductVariantWorkflowInputDTO,
  CreateProductWorkflowInputDTO,
  UpsertProductDTO,
} from '@medusajs/framework/types';
import {
  WorkflowResponse,
  createWorkflow,
  transform,
} from '@medusajs/framework/workflows-sdk';
import {
  createProductsWorkflow,
  updateProductsWorkflow,
  useQueryGraphStep,
} from '@medusajs/medusa/core-flows';

import { getShopifyProductsStep } from './steps/get-shopify-products';

type MigrateProductsFromShopifyWorkflowInput = {
  page?: number;
  limit?: number;
};

export const migrateProductsFromShopifyWorkflowId =
  'migrate-products-from-shopify';

export const migrateProductsFromShopifyWorkflow = createWorkflow(
  {
    name: migrateProductsFromShopifyWorkflowId,
    retentionTime: 10000,
    store: true,
  },
  (input: MigrateProductsFromShopifyWorkflowInput) => {
    const { products, pagination } = getShopifyProductsStep(input);

    const { data: stores } = useQueryGraphStep({
      entity: 'store',
      fields: ['supported_currencies.*', 'default_sales_channel_id'],
      pagination: {
        take: 1,
        skip: 0,
      },
    });

    const { data: shippingProfiles } = useQueryGraphStep({
      entity: 'shipping_profile',
      fields: ['id'],
      pagination: {
        take: 1,
        skip: 0,
      },
    }).config({ name: 'get-shipping-profiles' });

    const externalIdFilters = transform(
      {
        products,
      },
      (data) => {
        return data.products.map((product) => product.id.toString());
      }
    );

    const { data: existingProducts } = useQueryGraphStep({
      entity: 'product',
      fields: ['id', 'external_id', 'variants.id', 'variants.metadata'],
      filters: {
        external_id: externalIdFilters,
      },
    }).config({ name: 'get-existing-products' });

    const {
      productsToCreate,
      productsToUpdate,
      productsToCreateAdditionalData,
      productsToUpdateAdditionalData,
    } = transform(
      {
        products,
        stores,
        shippingProfiles,
        existingProducts,
      },
      (data) => {
        const productsToCreate = new Map<
          string,
          CreateProductWorkflowInputDTO
        >();
        const productsToCreateAdditionalData = new Map<
          string,
          Record<string, unknown>
        >();
        const productsToUpdate = new Map<string, UpsertProductDTO>();
        const productsToUpdateAdditionalData = new Map<
          string,
          Record<string, unknown>
        >();

        data.products.forEach((shopifyProduct) => {
          const productData: CreateProductWorkflowInputDTO | UpsertProductDTO =
            {
              title: shopifyProduct.title,
              description: shopifyProduct.body_html,
              status: 'published',
              handle: shopifyProduct.handle,
              external_id: shopifyProduct.id.toString(),
              thumbnail: shopifyProduct.images[0].src,
              sales_channels: [
                {
                  id: data.stores[0].default_sales_channel_id as string,
                },
              ],
              shipping_profile_id: data.shippingProfiles[0].id,
            };
          const additionalData = {
            vendor: shopifyProduct.vendor,
          };
          const existingProduct = data.existingProducts.find(
            (p) => p.external_id === productData.external_id
          );

          if (existingProduct) {
            productData.id = existingProduct.id;
          }

          productData.options =
            shopifyProduct.options?.map((option) => {
              return {
                title: option.name,
                values: option.values.map((opt) => opt) || [],
              };
            }) || [];

          productData.variants = shopifyProduct.variants?.map((variant) => {
            const variantExternalId = variant.id.toString();
            const existingVariant = existingProduct?.variants?.find(
              (v) => v.metadata!.external_id === variantExternalId
            );

            return {
              title: variant.title,
              sku: variant.sku || undefined,
              prices: (data.stores[0].supported_currencies ?? [])
                .map((entry) => entry?.currency_code)
                .filter((code): code is string => Boolean(code))
                .map((currency_code) => ({
                  amount: variant.price,
                  currency_code,
                })),
              weight: variant.grams,
              metadata: {
                external_id: variantExternalId,
              },
              id: existingVariant?.id,
            };
          }) as unknown as CreateProductVariantWorkflowInputDTO[];

          productData.images = shopifyProduct.images.map((entry) => {
            return {
              url: entry.src,
              metadata: {
                external_id: entry.id.toString(),
              },
            };
          });

          if (productData.id) {
            productsToUpdate.set(existingProduct!.id, productData);
            productsToUpdateAdditionalData.set(
              existingProduct!.id,
              additionalData
            );
          } else {
            productsToCreate.set(productData.external_id!, productData);
            productsToCreateAdditionalData.set(
              productData.external_id!,
              additionalData
            );
          }
        });

        return {
          productsToCreate: Array.from(productsToCreate.values()),
          productsToUpdate: Array.from(productsToUpdate.values()),
          productsToCreateAdditionalData: Array.from(
            productsToCreateAdditionalData.values()
          ),
          productsToUpdateAdditionalData: Array.from(
            productsToUpdateAdditionalData.values()
          ),
        };
      }
    );

    createProductsWorkflow.runAsStep({
      input: {
        products: productsToCreate,
        // @ts-ignore TODO: resolve this
        additional_data: productsToCreateAdditionalData,
      },
    });

    updateProductsWorkflow.runAsStep({
      input: {
        products: productsToUpdate,
        // @ts-ignore TODO: resolve this
        additional_data: productsToUpdateAdditionalData,
      },
    });

    return new WorkflowResponse(pagination);
  }
);

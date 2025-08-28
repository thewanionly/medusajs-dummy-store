import {
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

import { sanitizeHandle } from '../lib/utils';
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
    const { products, page } = getShopifyProductsStep(input);

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
      fields: [
        'id',
        'handle',
        'external_id',
        'variants.id',
        'variants.metadata',
      ],
      filters: {
        external_id: externalIdFilters,
      },
    }).config({ name: 'get-existing-products' });

    const { productsToCreate, productsToUpdate } = transform(
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
        const productsToUpdate = new Map<string, UpsertProductDTO>();

        data.products.forEach((shopifyProduct) => {
          const productData: CreateProductWorkflowInputDTO | UpsertProductDTO =
            {
              title: shopifyProduct.title,
              description: shopifyProduct.body_html,
              status: 'published',
              handle: sanitizeHandle(shopifyProduct.handle),
              external_id: shopifyProduct.id.toString(),
              thumbnail: shopifyProduct.images?.[0]?.src,
              sales_channels: [
                {
                  id: data.stores[0].default_sales_channel_id,
                },
              ],
              shipping_profile_id: data.shippingProfiles[0].id,
            };

          const existingProduct =
            data.existingProducts?.find(
              (p) => p.external_id === productData.external_id
            ) || null;

          if (existingProduct) {
            productData.id = existingProduct.id;
          }

          productData.options =
            shopifyProduct.options.map((option) => {
              return {
                title: option.name,
                values: option.values,
              };
            }) || [];

          productData.variants =
            (shopifyProduct.variants &&
              shopifyProduct.variants?.map((child) => {
                const variantExternalId = child.id.toString();
                const existingVariant =
                  (existingProduct?.variants &&
                    existingProduct?.variants?.find(
                      (v) => v.metadata.external_id === variantExternalId
                    )) ||
                  {};

                return {
                  title: child.title,
                  sku: child.sku,
                  prices: data.stores[0].supported_currencies.map(
                    ({ currency_code }) => {
                      return {
                        amount: child.price,
                        currency_code,
                      };
                    }
                  ),
                  metadata: {
                    external_id: variantExternalId,
                  },
                  id: existingVariant?.id,
                };
              })) ||
            {};

          productData.images = shopifyProduct.images.map((entry) => ({
            url: entry.src,
            metadata: {
              external_id: entry.id.toString(),
            },
          }));

          if (existingProduct || productData.id) {
            productsToUpdate.set(existingProduct.id, productData);
          } else {
            productsToCreate.set(productData.external_id!, productData);
          }
        });

        return {
          productsToCreate: Array.from(productsToCreate.values()),
          productsToUpdate: Array.from(productsToUpdate.values()),
        };
      }
    );

    createProductsWorkflow.runAsStep({
      input: {
        products: productsToCreate,
      },
    });

    updateProductsWorkflow.runAsStep({
      input: {
        products: productsToUpdate,
      },
    });

    return new WorkflowResponse({ page, pageLength: products.length });
  }
);

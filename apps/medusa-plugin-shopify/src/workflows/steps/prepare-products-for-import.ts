/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  CreateProductWorkflowInputDTO,
  ProductDTO,
  ProductTagDTO,
  ProductTypeDTO,
  UpsertProductDTO,
} from '@medusajs/framework/types';
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { sanitizeHandle } from '../../lib/utils';
import { ShopifyProduct } from '../../modules/shopify/types';

type PrepareProductsForImportStepInput = {
  products: ShopifyProduct[];
  stores: any;
  shippingProfiles: any;
  existingProducts: ProductDTO[];
  productTags: ProductTagDTO[];
  productTypes: ProductTypeDTO[];
};

export const prepareProductsForImportStep = createStep(
  'prepare-products-for-import',
  async ({
    products,
    stores,
    shippingProfiles,
    existingProducts,
    productTags,
    productTypes,
  }: PrepareProductsForImportStepInput) => {
    const productsToCreate = new Map<string, CreateProductWorkflowInputDTO>();
    const productsToUpdate = new Map<string, UpsertProductDTO>();

    products.forEach((shopifyProduct) => {
      const shopifyProductId = shopifyProduct.id.toString();
      const existingProduct = existingProducts?.find(
        (existingProduct) => existingProduct.external_id === shopifyProductId
      );
      const tagsToLink = productTags.filter((tag) =>
        shopifyProduct.tags.includes(tag.value)
      );
      const tagIdsToLink = tagsToLink.map((tag) => tag.id);
      const typeToLink = productTypes.find(
        (type) => type.value === shopifyProduct.product_type
      );

      const productOptions = shopifyProduct.options?.map((option) => {
        const existingOption = existingProduct?.options?.find(
          (existingOpt) => existingOpt.title === option.name
        );

        return {
          title: option.name,
          values: option.values,
          ...(existingOption
            ? {
                id: existingOption.id,
              }
            : null),
        };
      });

      const productData: CreateProductWorkflowInputDTO | UpsertProductDTO = {
        title: shopifyProduct.title,
        description: shopifyProduct.body_html,
        status: 'published',
        handle: sanitizeHandle(shopifyProduct.handle),
        external_id: shopifyProductId,
        thumbnail: shopifyProduct.images?.[0]?.src,
        tag_ids: tagIdsToLink,
        type_id: typeToLink?.id,
        sales_channels: [
          {
            id: stores[0].default_sales_channel_id,
          },
        ],
        shipping_profile_id: shippingProfiles[0].id,
        options: productOptions,
        images: shopifyProduct.images.map((entry) => {
          const existingImage = existingProduct?.images?.find(
            (existingImg) =>
              existingImg.metadata?.external_id === entry.id.toString()
          );

          return {
            url: entry.src,
            metadata: {
              external_id: entry.id.toString(),
            },
            ...(existingImage
              ? {
                  id: existingImage.id,
                }
              : null),
          };
        }),
        variants: shopifyProduct.variants?.map((child) => {
          const variantExternalId = child.id.toString();
          const existingVariant =
            existingProduct?.variants &&
            existingProduct?.variants?.find(
              (v) => v.metadata?.external_id === variantExternalId
            );
          const productOption = (optionIndex: number) =>
            productOptions.find((pOption) =>
              pOption.values.includes(child[`option${optionIndex}`])
            );
          const childOptions = {
            ...(productOption(1)?.title
              ? {
                  [productOption(1)?.title ?? child.option1]: child.option1,
                }
              : null),
            ...(productOption(2)?.title
              ? {
                  [productOption(2)?.title ?? child.option2]: child.option2,
                }
              : null),
            ...(productOption(3)?.title
              ? {
                  [productOption(3)?.title ?? child.option3]: child.option3,
                }
              : null),
          };

          return {
            title: child.title,
            sku: child.sku,
            prices: stores[0].supported_currencies.map(({ currency_code }) => {
              return {
                amount: child.price,
                currency_code,
              };
            }),
            options: childOptions,
            metadata: {
              external_id: variantExternalId,
            },
            ...(existingVariant
              ? {
                  id: existingVariant.id,
                }
              : null),
          };
        }),
        ...(existingProduct
          ? {
              id: existingProduct.id,
            }
          : null),
      };

      if (existingProduct) {
        productsToUpdate.set(existingProduct.id, productData);
      } else {
        productsToCreate.set(productData.external_id!, productData);
      }
    });

    return new StepResponse({
      productsToCreate: Array.from(productsToCreate.values()),
      productsToUpdate: Array.from(productsToUpdate.values()),
    });
  }
);

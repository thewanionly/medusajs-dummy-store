import { logger } from '@medusajs/framework';
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { SHOPIFY_MODULE } from '../../modules/shopify';
import ShopifyModuleService from '../../modules/shopify/service';

type GetShopifyProductsInCollectionInput = {
  collectionHandle: string;
  page?: number;
  limit?: number;
};

export const getShopifyProductsInCollectionStep = createStep(
  'get-shopify-products-in-collection',
  async (
    { collectionHandle, page, limit }: GetShopifyProductsInCollectionInput,
    { container }
  ) => {
    const shopifyModuleService: ShopifyModuleService =
      container.resolve(SHOPIFY_MODULE);

    logger.info(
      `Retrieving Shopify products for collection handle ${collectionHandle}`
    );

    const response = await shopifyModuleService.getProductsInCollection({
      collectionHandle,
      page,
      limit,
    });

    return new StepResponse(response);
  }
);

import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { SHOPIFY_MODULE } from '../../modules/shopify';
import ShopifyModuleService from '../../modules/shopify/service';

type GetShopifyCollectionsInput = {
  page: number;
  limit: number;
};

export const getShopifyCollectionsStep = createStep(
  'get-shopify-collections',
  async ({ page, limit }: GetShopifyCollectionsInput, { container }) => {
    const shopifyModuleService: ShopifyModuleService =
      container.resolve(SHOPIFY_MODULE);

    const response = await shopifyModuleService.getCollections({
      page,
      limit,
    });

    return new StepResponse(response);
  }
);

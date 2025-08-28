import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { SHOPIFY_MODULE } from '../../modules/shopify';
import ShopifyModuleService from '../../modules/shopify/service';

type GetShopifyProductsInput = {
  page?: number;
  limit?: number;
};

export const getShopifyProductsStep = createStep(
  'get-shopify-products',
  async ({ page, limit }: GetShopifyProductsInput, { container }) => {
    const shopifyModuleService: ShopifyModuleService =
      container.resolve(SHOPIFY_MODULE);

    const response = await shopifyModuleService.getProducts({
      page,
      limit,
    });

    return new StepResponse(response);
  }
);

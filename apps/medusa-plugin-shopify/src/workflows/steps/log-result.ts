import { logger } from '@medusajs/framework';
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { SHOPIFY_MODULE } from '../../modules/shopify';
import ShopifyModuleService from '../../modules/shopify/service';

type LogResultStepInput = {
  message: string;
  result: any;
};

export const logResultStep = createStep(
  'log-result',
  async ({ message, result }: LogResultStepInput, { container }) => {
    logger.info(message);
    logger.info(JSON.stringify(result));

    return new StepResponse(1);
  }
);

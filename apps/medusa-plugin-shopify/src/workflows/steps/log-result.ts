import { logger } from '@medusajs/framework';
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

type LogResultStepInput = {
  message: string;
  result: unknown;
};

export const logResultStep = createStep(
  'log-result',
  async ({ message, result }: LogResultStepInput) => {
    logger.info(message);
    logger.info(JSON.stringify(result));

    return new StepResponse(1);
  }
);

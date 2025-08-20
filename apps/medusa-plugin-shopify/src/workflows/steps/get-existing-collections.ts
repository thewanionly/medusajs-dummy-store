import { logger } from '@medusajs/framework';
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

type GetExistingCollectionsInput = {
  filters?: Record<string, any>;
};

export const getExistingCollectionsStep = createStep(
  'get-existing-collections',
  async ({ filters }: GetExistingCollectionsInput, { container }) => {
    const productModuleService = container.resolve('product');

    const collections = await productModuleService.listProductCollections(
      filters,
      { relations: ['products'], take: 250 }
    );

    logger.info(
      `Retrieving existing collections in database: ${JSON.stringify(collections)}`
    );

    return new StepResponse({ collections });
  }
);

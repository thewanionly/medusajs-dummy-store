import { logger } from '@medusajs/framework';
import type { FilterableProductCollectionProps } from '@medusajs/framework/types';
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

type GetExistingCollectionInput = {
  filters?: FilterableProductCollectionProps;
  page: number;
};

export const getExistingCollectionStep = createStep(
  'get-existing-collections',
  async ({ filters, page }: GetExistingCollectionInput, { container }) => {
    const productModuleService = container.resolve('product');

    const collection = await productModuleService.listProductCollections(
      filters,
      { relations: ['products'], take: 1, skip: page }
    );

    logger.info(
      `Retrieved existing collection ID ${collection[0]?.id ?? '[no id]'} with handle ${collection[0]?.handle ?? '[no handle]'}`
    );

    return new StepResponse({ collection: collection[0], page });
  }
);

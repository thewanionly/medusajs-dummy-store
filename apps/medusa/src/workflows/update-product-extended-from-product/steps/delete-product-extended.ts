import { InferTypeOf } from '@medusajs/framework/types';
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { PRODUCT_EXTENDED_MODULE } from '../../../modules/productExtended';
import ProductExtended from '../../../modules/productExtended/models/productExtended';
import ProductExtendedService from '../../../modules/productExtended/service';

type DeleteProductExtendedStepInput = {
  productExtended: InferTypeOf<typeof ProductExtended>;
};

export const deleteProductExtendedStep = createStep(
  'delete-product-extended',
  async (
    { productExtended }: DeleteProductExtendedStepInput,
    { container }
  ) => {
    const productExtendedModuleService: ProductExtendedService =
      container.resolve(PRODUCT_EXTENDED_MODULE);

    await productExtendedModuleService.deleteProductExtendeds(
      productExtended.id
    );

    return new StepResponse(productExtended, productExtended);
  },
  async (productExtended, { container }) => {
    const productExtendedModuleService: ProductExtendedService =
      container.resolve(PRODUCT_EXTENDED_MODULE);

    await productExtendedModuleService.createProductExtendeds(productExtended!);
  }
);

import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { PRODUCT_VARIANT_EXTENDED_MODULE } from '../../../modules/productVariantExtended';
import ProductVariantExtendedService from '../../../modules/productVariantExtended/service';

type UpdateProductVariantExtendedStepInput = {
  id: string;
  requires_shipping: boolean;
};

export const updateProductVariantExtendedStep = createStep(
  'update-product-variant-extended',
  async (
    { id, requires_shipping }: UpdateProductVariantExtendedStepInput,
    { container }
  ) => {
    const productExtendedModuleService: ProductVariantExtendedService =
      container.resolve(PRODUCT_VARIANT_EXTENDED_MODULE);

    const prevData =
      await productExtendedModuleService.retrieveProductVariantExtended(id);

    const productVariantExtended =
      await productExtendedModuleService.updateProductVariantExtendeds({
        id,
        requires_shipping,
      });

    return new StepResponse(productVariantExtended, prevData);
  },
  async (prevData, { container }) => {
    const productExtendedModuleService: ProductVariantExtendedService =
      container.resolve(PRODUCT_VARIANT_EXTENDED_MODULE);

    await productExtendedModuleService.updateProductVariantExtendeds(prevData!);
  }
);

import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { PRODUCT_VARIANT_EXTENDED_MODULE } from '../../../modules/productVariantExtended';
import ProductVariantExtendedService from '../../../modules/productVariantExtended/service';

type CreateProductVariantExtendedStepInput = {
  requires_shipping?: boolean;
};

export const createProductVariantExtendedStep = createStep(
  'create-product-variant-extended',
  async (data: CreateProductVariantExtendedStepInput, { container }) => {
    if (
      data.requires_shipping === null ||
      data.requires_shipping === undefined
    ) {
      return;
    }

    const productVariantExtendedModuleService: ProductVariantExtendedService =
      container.resolve(PRODUCT_VARIANT_EXTENDED_MODULE);

    const productExtended =
      await productVariantExtendedModuleService.createProductVariantExtendeds(
        data
      );

    return new StepResponse(productExtended, productExtended);
  },
  async (productExtended, { container }) => {
    const productVariantExtendedModuleService: ProductVariantExtendedService =
      container.resolve(PRODUCT_VARIANT_EXTENDED_MODULE);

    await productVariantExtendedModuleService.deleteProductVariantExtendeds(
      productExtended!.id
    );
  }
);

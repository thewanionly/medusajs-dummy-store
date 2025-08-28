import { InferTypeOf } from '@medusajs/framework/types';
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { PRODUCT_VARIANT_EXTENDED_MODULE } from '../../../modules/productVariantExtended';
import ProductVariantExtended from '../../../modules/productVariantExtended/models/productVariantExtended';
import ProductVariantExtendedService from '../../../modules/productVariantExtended/service';

type DeleteProductVariantExtendedStepInput = {
  productVariantExtended: InferTypeOf<typeof ProductVariantExtended>;
};

export const deleteProductVariantExtendedStep = createStep(
  'delete-product-variant-extended',
  async (
    { productVariantExtended }: DeleteProductVariantExtendedStepInput,
    { container }
  ) => {
    const productExtendedModuleService: ProductVariantExtendedService =
      container.resolve(PRODUCT_VARIANT_EXTENDED_MODULE);

    await productExtendedModuleService.deleteProductVariantExtendeds(
      productVariantExtended.id
    );

    return new StepResponse(productVariantExtended, productVariantExtended);
  },
  async (productVariantExtended, { container }) => {
    const productExtendedModuleService: ProductVariantExtendedService =
      container.resolve(PRODUCT_VARIANT_EXTENDED_MODULE);

    await productExtendedModuleService.createProductVariantExtendeds(
      productVariantExtended!
    );
  }
);

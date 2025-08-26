import { updateProductsWorkflow } from '@medusajs/medusa/core-flows';

import {
  UpdateProductExtendedFromProductStepInput,
  updateProductExtendedFromProductWorkflow,
} from '../update-product-extended-from-product';
import {
  UpdateProductVariantExtendedFromProductStepInput,
  updateProductVariantExtendedFromProductWorkflow,
} from '../update-product-variant-extended-from-product-variant';

updateProductsWorkflow.hooks.productsUpdated(
  async ({ products, additional_data }, { container }) => {
    const workflow = updateProductExtendedFromProductWorkflow(container);
    const variantWorkflow =
      updateProductVariantExtendedFromProductWorkflow(container);

    console.log('### productsUpdated hook additional data', additional_data);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      const additionalDataValue = additional_data?.isFromMigration
        ? (additional_data as { product: unknown[] })?.product?.[i]
        : additional_data;

      await workflow.run({
        input: {
          product,
          additional_data: additionalDataValue,
        } as UpdateProductExtendedFromProductStepInput,
      });

      if (additional_data?.isFromMigration) {
        for (let j = 0; j < product.variants.length; j++) {
          const variant = product.variants[j];
          const additionalVariantsData = (
            additional_data as { variant: Record<string, any> }
          ).variant[variant.id];

          await variantWorkflow.run({
            input: {
              variant,
              additional_data: additionalVariantsData,
            } as UpdateProductVariantExtendedFromProductStepInput,
          });
        }
      }
    }
  }
);

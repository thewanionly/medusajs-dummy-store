import { createProductsWorkflow } from '@medusajs/medusa/core-flows';

import {
  CreateProductExtendedFromProductWorkflowInput,
  createProductExtendedFromProductWorkflow,
} from '../create-product-extended-from-product';
import {
  CreateProductVariantExtendedFromProductWorkflowInput,
  createProductVariantExtendedFromProductWorkflow,
} from '../create-product-variant-extended-from-product-variant';

createProductsWorkflow.hooks.productsCreated(
  async ({ products, additional_data }, { container }) => {
    const workflow = createProductExtendedFromProductWorkflow(container);
    const variantWorkflow =
      createProductVariantExtendedFromProductWorkflow(container);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const additionalDataValue = additional_data?.isFromMigration
        ? (additional_data as { product: unknown[] })?.product?.[i]
        : additional_data;

      await workflow.run({
        input: {
          product,
          additional_data: additionalDataValue,
        } as CreateProductExtendedFromProductWorkflowInput,
      });

      if (additional_data?.isFromMigration) {
        for (let j = 0; j < product.variants.length; j++) {
          const variant = product.variants[j];
          const additionalVariantsData = (
            additional_data as { variant: Record<string, any> }
          ).variant[variant.metadata!.external_id as string];

          await variantWorkflow.run({
            input: {
              variant,
              additional_data: additionalVariantsData,
            } as CreateProductVariantExtendedFromProductWorkflowInput,
          });
        }
      }
    }
  }
);

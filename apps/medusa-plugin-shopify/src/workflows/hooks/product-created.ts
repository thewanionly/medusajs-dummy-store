import { createProductsWorkflow } from '@medusajs/medusa/core-flows';

import {
  CreateProductExtendedFromProductWorkflowInput,
  createProductExtendedFromProductWorkflow,
} from '../create-product-extended-from-product';

createProductsWorkflow.hooks.productsCreated(
  async ({ products, additional_data }, { container }) => {
    const workflow = createProductExtendedFromProductWorkflow(container);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const productId = product.external_id;
      const additionalDataValue =
        additional_data?.isFromMigration && productId
          ? (
              additional_data as {
                products: Record<string, Record<string, unknown>>;
              }
            )?.products?.[productId]
          : additional_data;

      await workflow.run({
        input: {
          product,
          additional_data: additionalDataValue,
        } as CreateProductExtendedFromProductWorkflowInput,
      });
    }
  }
);

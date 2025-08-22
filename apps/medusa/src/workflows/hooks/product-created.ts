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
      const additionalDataValue = Array.isArray(additional_data)
        ? additional_data?.[i]
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

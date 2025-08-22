import { updateProductsWorkflow } from '@medusajs/medusa/core-flows';

import {
  UpdateProductExtendedFromProductStepInput,
  updateProductExtendedFromProductWorkflow,
} from '../update-product-extended-from-product';

updateProductsWorkflow.hooks.productsUpdated(
  async ({ products, additional_data }, { container }) => {
    const workflow = updateProductExtendedFromProductWorkflow(container);

    console.log('### productsUpdated hook additional_data', additional_data);

    for (let i = 0; i < products.length; i++) {
      const product = products[i];

      const additionalDataValue = Array.isArray(additional_data)
        ? additional_data?.[i]
        : additional_data;

      await workflow.run({
        input: {
          product,
          additional_data: additionalDataValue,
        } as UpdateProductExtendedFromProductStepInput,
      });
    }
  }
);

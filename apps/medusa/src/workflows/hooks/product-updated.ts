import { updateProductsWorkflow } from '@medusajs/medusa/core-flows';

import {
  UpdateProductExtendedFromProductStepInput,
  updateProductExtendedFromProductWorkflow,
} from '../update-product-extended-from-product';

updateProductsWorkflow.hooks.productsUpdated(
  async ({ products, additional_data }, { container }) => {
    const workflow = updateProductExtendedFromProductWorkflow(container);
    console.log('### updateProductsWorkflow additional_data', additional_data);
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const vendor =
        (additional_data?.[i] as unknown as Record<string, string>)?.vendor ??
        '';

      await workflow.run({
        input: {
          productId: product.id,
          vendor,
        } as UpdateProductExtendedFromProductStepInput,
      });
    }
  }
);

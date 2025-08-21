import { createProductsWorkflow } from '@medusajs/medusa/core-flows';

import {
  CreateProductExtendedFromProductWorkflowInput,
  createProductExtendedFromProductWorkflow,
} from '../create-product-extended-from-product';

createProductsWorkflow.hooks.productsCreated(
  async ({ products, additional_data }, { container }) => {
    const workflow = createProductExtendedFromProductWorkflow(container);
    console.log('### createProductsWorkflow additional_data', additional_data);
    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      const vendor =
        (additional_data?.[i] as unknown as Record<string, string>)?.vendor ??
        '';
      await workflow.run({
        input: {
          productId: product.id,
          vendor,
        } as CreateProductExtendedFromProductWorkflowInput,
      });
    }
  }
);

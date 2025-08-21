import { Modules } from '@medusajs/framework/utils';
import {
  WorkflowResponse,
  createWorkflow,
  transform,
  when,
} from '@medusajs/framework/workflows-sdk';
import { createRemoteLinkStep } from '@medusajs/medusa/core-flows';

import { PRODUCT_EXTENDED_MODULE } from '../../modules/productExtended';
import { createProductExtendedStep } from './steps/create-product-extended';

export type CreateProductExtendedFromProductWorkflowInput = {
  productId: string;
  vendor: string;
};

export const createProductExtendedFromProductWorkflow = createWorkflow(
  'create-product-extended-from-product',
  (input: CreateProductExtendedFromProductWorkflowInput) => {
    const productExtendedVendor = transform(
      {
        input,
      },
      (data) => data.input.vendor || ''
    );

    const productExtended = createProductExtendedStep({
      vendor: productExtendedVendor,
    });

    when(
      { productExtended },
      ({ productExtended }) => productExtended !== undefined
    ).then(() => {
      createRemoteLinkStep([
        {
          [Modules.PRODUCT]: {
            product_id: input.productId,
          },
          [PRODUCT_EXTENDED_MODULE]: {
            product_extended_id: productExtended.id,
          },
        },
      ]);
    });

    return new WorkflowResponse({
      productExtended,
    });
  }
);

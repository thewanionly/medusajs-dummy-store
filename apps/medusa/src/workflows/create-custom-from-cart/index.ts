import { CartDTO } from '@medusajs/framework/types';
import { Modules } from '@medusajs/framework/utils';
import {
  WorkflowResponse,
  createWorkflow,
  transform,
  when,
} from '@medusajs/framework/workflows-sdk';
import { createRemoteLinkStep } from '@medusajs/medusa/core-flows';

import { HELLO_MODULE } from '../../modules/hello';
import { createCustomStep } from './steps/create-custom';

export type CreateCustomFromCartWorkflowInput = {
  cart: CartDTO;
  additional_data?: {
    custom_name?: string;
  };
};

export const createCustomFromCartWorkflow = createWorkflow(
  'create-custom-from-cart',
  (input: CreateCustomFromCartWorkflowInput) => {
    const customName = transform(
      {
        input,
      },
      (data) => data.input.additional_data?.custom_name || ''
    );

    const custom = createCustomStep({
      custom_name: customName,
    });

    when({ custom }, ({ custom }) => custom !== undefined).then(() => {
      createRemoteLinkStep([
        {
          [Modules.CART]: {
            cart_id: input.cart.id,
          },
          [HELLO_MODULE]: {
            custom_id: custom.id,
          },
        },
      ]);
    });

    return new WorkflowResponse({
      custom,
    });
  }
);

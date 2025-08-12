import { CartDTO } from '@medusajs/framework/types';
import { Modules } from '@medusajs/framework/utils';
import {
  WorkflowResponse,
  createWorkflow,
  when,
} from '@medusajs/framework/workflows-sdk';
import {
  createRemoteLinkStep,
  dismissRemoteLinkStep,
  useQueryGraphStep,
} from '@medusajs/medusa/core-flows';

import { HELLO_MODULE } from '../../modules/hello';
import { createCustomStep } from '../create-custom-from-cart/steps/create-custom';
import { deleteCustomStep } from './steps/delete-custom';
import { updateCustomStep } from './steps/update-custom';

export type UpdateCustomFromCartStepInput = {
  cart: CartDTO;
  additional_data?: {
    custom_name?: string | null;
  };
};

export const updateCustomFromCartWorkflow = createWorkflow(
  'update-custom-from-cart',
  (input: UpdateCustomFromCartStepInput) => {
    const { data: carts } = useQueryGraphStep({
      entity: 'cart',
      fields: ['custom.*'],
      filters: {
        id: input.cart.id,
      },
    });

    // Create
    // If additional_data.custom_name is set and the cart doesn't have a linked Custom record, a new record is created and linked to the cart.
    const created = when(
      'create-cart-custom-link',
      {
        input,
        carts,
      },
      (data) =>
        !data.carts[0].custom &&
        data.input.additional_data?.custom_name?.length! > 0
    ).then(() => {
      const custom = createCustomStep({
        custom_name: input.additional_data!.custom_name as string,
      });

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

      return custom;
    });

    // Delete
    // If additional_data.custom_name is set and it's null, the Custom record linked to the cart is deleted
    const deleted = when(
      'delete-cart-custom-link',
      {
        input,
        carts,
      },
      (data) =>
        Boolean(
          data.carts[0].custom &&
            (data.input.additional_data?.custom_name === null ||
              data.input.additional_data?.custom_name!.length === 0)
        )
    ).then(() => {
      deleteCustomStep({
        // @ts-expect-error
        custom: carts[0].custom!,
      });

      dismissRemoteLinkStep({
        [HELLO_MODULE]: {
          custom_id: carts[0].custom!.id,
        },
      });

      return carts[0].custom!.id;
    });

    // Update
    // If additional_data.custom_name is set and the cart has a linked Custom record, the custom_name property of the Custom record is updated
    const updated = when(
      {
        input,
        carts,
      },
      (data) =>
        Boolean(
          data.carts[0].custom &&
            data.input.additional_data?.custom_name?.length! > 0
        )
    ).then(() => {
      return updateCustomStep({
        id: carts[0].custom!.id,
        custom_name: input.additional_data!.custom_name as string,
      });
    });

    return new WorkflowResponse({
      created,
      updated,
      deleted,
    });
  }
);

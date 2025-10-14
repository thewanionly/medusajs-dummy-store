import { CreatePromotionDTO } from '@medusajs/framework/types';
import { PromotionActions } from '@medusajs/framework/utils';
import {
  WorkflowResponse,
  createWorkflow,
  transform,
} from '@medusajs/framework/workflows-sdk';
import {
  createPromotionsStep,
  updateCartPromotionsWorkflow,
  updateCartsStep,
  useQueryGraphStep,
} from '@medusajs/medusa/core-flows';

import {
  CUSTOMER_ID_PROMOTION_RULE_ATTRIBUTE,
  CartData,
} from '../../utils/loyalty';
import { getCartLoyaltyPromoStep } from './steps/get-cart-loyalty-promo';
import {
  GetCartLoyaltyPromoAmountStepInput,
  getCartLoyaltyPromoAmountStep,
} from './steps/get-cart-loyalty-promo-amount';
import { lockPointsStep } from './steps/lock-points';
import { retrieveLoyaltyPointStep } from './steps/retrieve-loyalty-point';
import {
  ValidateCustomerExistsStepInput,
  validateCustomerExistsStep,
} from './steps/validate-customer-exists';

type WorkflowInput = {
  cart_id: string;
};

const fields = [
  'id',
  'customer.*',
  'promotions.*',
  'promotions.application_method.*',
  'promotions.rules.*',
  'promotions.rules.values.*',
  'currency_code',
  'total',
  'metadata',
];

const returnedFields = [
  '*',
  'customer.*',
  'promotions.*',
  'promotions.application_method.*',
  'promotions.rules.*',
  'promotions.rules.values.*',
  'items.*',
  'metadata.*',
];

export const applyLoyaltyOnCartWorkflow = createWorkflow(
  'apply-loyalty-on-cart',
  (input: WorkflowInput) => {
    const { data: carts } = useQueryGraphStep({
      entity: 'cart',
      fields,
      filters: {
        id: input.cart_id,
      },
      options: {
        throwIfKeyNotFound: true,
      },
    });

    validateCustomerExistsStep({
      customer: carts[0].customer,
    } as ValidateCustomerExistsStepInput);

    getCartLoyaltyPromoStep({
      cart: carts[0] as unknown as CartData,
      throwErrorOn: 'found',
    });

    const amount = getCartLoyaltyPromoAmountStep({
      cart: carts[0],
    } as unknown as GetCartLoyaltyPromoAmountStepInput);

    const promoToCreate = transform(
      {
        carts,
        amount,
      },
      (data) => {
        const randomStr = Math.random().toString(36).substring(2, 8);
        const uniqueId = (
          'LOYALTY-' +
          data.carts[0].customer?.first_name +
          '-' +
          randomStr
        ).toUpperCase();
        return {
          code: uniqueId,
          type: 'standard',
          status: 'active',
          application_method: {
            type: 'fixed',
            value: data.amount,
            target_type: 'order',
            currency_code: data.carts[0].currency_code,
            allocation: 'across',
          },
          rules: [
            {
              attribute: CUSTOMER_ID_PROMOTION_RULE_ATTRIBUTE,
              operator: 'eq',
              values: [data.carts[0].customer!.id],
            },
          ],
          campaign: {
            name: uniqueId,
            description:
              'Loyalty points promotion for ' + data.carts[0].customer!.email,
            campaign_identifier: uniqueId,
            budget: {
              type: 'usage',
              limit: 1,
            },
          },
        };
      }
    );

    const loyaltyPromo = createPromotionsStep([
      promoToCreate,
    ] as CreatePromotionDTO[]);

    const { metadata, ...updatePromoData } = transform(
      {
        carts,
        promoToCreate,
        loyaltyPromo,
      },
      (data) => {
        const promos = [
          ...(((data.carts[0] as unknown as CartData).promotions
            ?.map((promo) => promo?.code)
            .filter(Boolean) || []) as string[]),
          data.promoToCreate.code,
        ];

        return {
          cart_id: data.carts[0].id,
          promo_codes: promos,
          action: PromotionActions.ADD,
          metadata: {
            loyalty_promo_id: data.loyaltyPromo[0].id,
          },
        };
      }
    );

    updateCartPromotionsWorkflow.runAsStep({
      input: updatePromoData,
    });

    updateCartsStep([
      {
        id: input.cart_id,
        metadata,
      },
    ]);

    const loyaltyPoints = retrieveLoyaltyPointStep({
      customerId: carts[0].customer_id!,
    });

    // Lock all loyalty points available by default
    lockPointsStep({
      customerId: carts[0].customer_id!,
      pointsToLock: loyaltyPoints.points,
    });

    // Retrieve cart with updated promotions
    const { data: updatedCarts } = useQueryGraphStep({
      entity: 'cart',
      fields: returnedFields,
      filters: { id: input.cart_id },
    }).config({ name: 'retrieve-cart' });

    return new WorkflowResponse(updatedCarts[0]);
  }
);

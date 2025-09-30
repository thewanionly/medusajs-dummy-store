import {
  WorkflowResponse,
  createWorkflow,
  when,
} from '@medusajs/framework/workflows-sdk';
import { useQueryGraphStep } from '@medusajs/medusa/core-flows';

import { createRewardStep } from './steps/create-reward';
import { linkProductToRewardStep } from './steps/link-product-to-reward';

type CreateRewardWorkflowInput = {
  points_cost: number;
  product_id?: string;
};

export const createRewardWorkflow = createWorkflow(
  'create-reward',
  (input: CreateRewardWorkflowInput) => {
    const reward = createRewardStep({ points_cost: input.points_cost });

    when(input, (data) => data.product_id !== undefined).then(() => {
      linkProductToRewardStep({
        reward_id: reward.id,
        product_id: input.product_id!,
      });
    });

    const result = useQueryGraphStep({
      entity: 'reward',
      fields: ['*', 'product.*'],
      filters: { id: reward.id },
    });

    return new WorkflowResponse(result.data[0]);
  }
);

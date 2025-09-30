import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { LOYALTY_MODULE } from '../../../modules/loyalty';
import LoyaltyModuleService from '../../../modules/loyalty/service';

export type RetrieveRewardStepInput = {
  id: string;
};

export const retrieveRewardStep = createStep(
  'retrieve-reward-step',
  async (input: RetrieveRewardStepInput, { container }) => {
    const loyaltyModuleService: LoyaltyModuleService =
      container.resolve(LOYALTY_MODULE);

    const reward = await loyaltyModuleService.retrieveReward(input.id);

    return new StepResponse(reward);
  }
);

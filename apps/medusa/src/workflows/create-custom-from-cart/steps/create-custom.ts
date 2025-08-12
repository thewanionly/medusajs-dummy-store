import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { HELLO_MODULE } from '../../../modules/hello';
import HelloModuleService from '../../../modules/hello/service';

type CreateCustomStepInput = {
  custom_name?: string;
};

export const createCustomStep = createStep(
  'create-custom',
  async (data: CreateCustomStepInput, { container }) => {
    if (!data.custom_name) {
      return;
    }

    const helloModuleService: HelloModuleService =
      container.resolve(HELLO_MODULE);

    const custom = await helloModuleService.createCustoms(data);

    return new StepResponse(custom, custom);
  },
  async (custom, { container }) => {
    const helloModuleService: HelloModuleService =
      container.resolve(HELLO_MODULE);

    await helloModuleService.deleteCustoms(custom!.id);
  }
);

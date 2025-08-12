import { InferTypeOf } from '@medusajs/framework/types';
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { HELLO_MODULE } from '../../../modules/hello';
import Custom from '../../../modules/hello/models/custom';
import HelloModuleService from '../../../modules/hello/service';

type DeleteCustomStepInput = {
  custom: InferTypeOf<typeof Custom>;
};

export const deleteCustomStep = createStep(
  'delete-custom',
  async ({ custom }: DeleteCustomStepInput, { container }) => {
    const helloModuleService: HelloModuleService =
      container.resolve(HELLO_MODULE);

    await helloModuleService.deleteCustoms(custom.id);

    return new StepResponse(custom, custom);
  },
  async (custom, { container }) => {
    const helloModuleService: HelloModuleService =
      container.resolve(HELLO_MODULE);

    await helloModuleService.createCustoms(custom!);
  }
);

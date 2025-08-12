import { updateCartWorkflow } from '@medusajs/medusa/core-flows';

import {
  UpdateCustomFromCartStepInput,
  updateCustomFromCartWorkflow,
} from '../update-custom-from-cart';

updateCartWorkflow.hooks.cartUpdated(async (hookData, { container }) => {
  await updateCustomFromCartWorkflow(container).run({
    input: hookData as UpdateCustomFromCartStepInput,
  });
});

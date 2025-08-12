import { createCartWorkflow } from '@medusajs/medusa/core-flows';

import {
  CreateCustomFromCartWorkflowInput,
  createCustomFromCartWorkflow,
} from '../create-custom-from-cart';

createCartWorkflow.hooks.cartCreated(async (hookData, { container }) => {
  await createCustomFromCartWorkflow(container).run({
    input: hookData as CreateCustomFromCartWorkflowInput,
  });
});

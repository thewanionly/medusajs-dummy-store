import { z } from 'zod';

import { defineMiddlewares } from '@medusajs/framework/http';

export default defineMiddlewares({
  routes: [
    {
      method: 'POST',
      matcher: '/store/carts',
      additionalDataValidator: {
        custom_name: z.string().optional(),
      },
    },
    {
      method: 'POST',
      matcher: '/store/carts/:id',
      additionalDataValidator: {
        custom_name: z.string().nullish(),
      },
    },
  ],
});

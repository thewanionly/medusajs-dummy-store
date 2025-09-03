import { z } from 'zod';

import { defineMiddlewares } from '@medusajs/framework/http';

export default defineMiddlewares({
  routes: [
    {
      method: 'POST',
      matcher: '/admin/products',
      additionalDataValidator: {
        vendor: z.string().optional(),
      },
    },
  ],
});

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
    {
      method: 'POST',
      matcher: '/admin/products/:id',
      additionalDataValidator: {
        vendor: z.string().nullish(),
      },
    },
    {
      method: 'POST',
      matcher: '/admin/products/:id/variants',
      additionalDataValidator: {
        requires_shipping: z.boolean().optional(),
      },
    },
    {
      method: 'POST',
      matcher: '/admin/products/:id/variants/:variant_id',
      additionalDataValidator: {
        requires_shipping: z.boolean().nullish(),
      },
    },
  ],
});

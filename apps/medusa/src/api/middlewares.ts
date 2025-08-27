import { z } from 'zod';

import {
  defineMiddlewares,
  validateAndTransformQuery,
} from '@medusajs/framework/http';

import { GetProductsWithCustomSchema } from './store/products-with-custom/route';

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
      matcher: '/store/products-with-custom',
      method: ['GET'],
      middlewares: [
        validateAndTransformQuery(GetProductsWithCustomSchema, {
          isList: true,
        }),
      ],
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

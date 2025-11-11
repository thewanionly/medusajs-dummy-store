import { HttpResponse, http } from 'msw';

import { createMockCart } from '@mocks/cart';
import { createMockOrder } from '@mocks/order';

export const handlers = [
  http.get(`${process.env.MEDUSA_API_URL}/store/carts/:id`, () => {
    return HttpResponse.json({ cart: createMockCart() });
  }),

  http.post(`${process.env.MEDUSA_API_URL}/store/carts`, async () => {
    return HttpResponse.json({ cart: createMockCart() });
  }),

  http.post(`${process.env.MEDUSA_API_URL}/store/carts/:id`, async () => {
    return HttpResponse.json({ cart: createMockCart() });
  }),

  http.post(
    `${process.env.MEDUSA_API_URL}/store/carts/:id/line-items`,
    async () => {
      return HttpResponse.json({ cart: createMockCart() });
    }
  ),

  http.post(
    `${process.env.MEDUSA_API_URL}/store/carts/:id/line-items/:line_id`,
    async () => {
      return HttpResponse.json({ cart: createMockCart() });
    }
  ),

  http.post(
    `${process.env.MEDUSA_API_URL}/store/carts/:id/gift-cards`,
    async () => {
      return HttpResponse.json({ cart: createMockCart() });
    }
  ),

  http.post(
    `${process.env.MEDUSA_API_URL}/store/carts/:id/promotions`,
    async () => {
      return HttpResponse.json({ cart: createMockCart() });
    }
  ),

  http.post(
    `${process.env.MEDUSA_API_URL}/store/carts/:id/shipping-methods`,
    async () => {
      return HttpResponse.json({ cart: createMockCart() });
    }
  ),

  http.post(
    `${process.env.MEDUSA_API_URL}/store/carts/:id/store-credits`,
    async () => {
      return HttpResponse.json({ cart: createMockCart() });
    }
  ),

  http.post(`${process.env.MEDUSA_API_URL}/store/carts/:id/taxes`, async () => {
    return HttpResponse.json({ cart: createMockCart() });
  }),

  http.post(
    `${process.env.MEDUSA_API_URL}/store/carts/:id/customer`,
    async () => {
      return HttpResponse.json({ cart: createMockCart() });
    }
  ),

  http.post(
    `${process.env.MEDUSA_API_URL}/store/carts/:id/complete`,
    async () => {
      return HttpResponse.json({ type: 'order', order: createMockOrder() });
    }
  ),

  http.delete(
    `${process.env.MEDUSA_API_URL}/store/carts/:id/gift-cards`,
    async () => {
      return HttpResponse.json({ cart: createMockCart() });
    }
  ),

  http.delete(
    `${process.env.MEDUSA_API_URL}/store/carts/:id/line-items/:line_id`,
    async () => {
      return HttpResponse.json({
        id: 'line-item-id',
        object: 'line-item-name',
        deleted: true,
      });
    }
  ),

  http.delete(
    `${process.env.MEDUSA_API_URL}/store/carts/:id/promotions`,
    async () => {
      return HttpResponse.json({ cart: createMockCart() });
    }
  ),
];

export const invalidCartHandler = http.get(
  `${process.env.MEDUSA_API_URL}/store/carts/:id`,
  () =>
    HttpResponse.json({ message: 'Cart not found or invalid' }, { status: 404 })
);

export const invalidAddLineItemHandler = http.post(
  `${process.env.MEDUSA_API_URL}/store/carts/:id/line-items/:line_id`,
  ({ params }) => {
    const { line_id } = params;
    return HttpResponse.json(
      {
        message: `Line item with id "${line_id}" not found.`,
      },
      { status: 404 }
    );
  }
);

export const invalidDeleteLineItemHandler = http.delete(
  `${process.env.MEDUSA_API_URL}/store/carts/:id/line-items/:line_id`,
  ({ params }) => {
    const { id, line_id } = params;
    return HttpResponse.json(
      {
        message: `Line item with id "${line_id}" not found in cart "${id}".`,
      },
      { status: 404 }
    );
  }
);

export const unauthorizedAccessHandler = http.get(
  `${process.env.MEDUSA_API_URL}/store/carts/:id`,
  () => HttpResponse.json({ message: 'Unauthorized' }, { status: 401 })
);

export const internalServerErrorHandler = http.get(
  `${process.env.MEDUSA_API_URL}/store/carts/:id`,
  () => HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 })
);

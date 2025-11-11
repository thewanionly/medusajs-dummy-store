import { HttpResponse, delay, http } from 'msw';

import { mockedAddToCartResponse, mockedCart } from '../../data/carts';
import { withActiveMockGate } from '../utils/withActiveMockGate';

// Happy paths
export const createCartSuccess = http.post(
  'http://localhost:9000/store/carts',
  async () => {
    await delay(500);

    return HttpResponse.json({
      cart: mockedCart,
    });
  }
);

export const addToCartSuccess = http.post(
  'http://localhost:9000/store/carts/:id/line-items',
  async () => {
    await delay(500);

    return HttpResponse.json({
      cart: mockedAddToCartResponse,
    });
  }
);

// Handlers used in the application.
// Use `withActiveMockGate` to enable/disable the handler based on activeMock config
export const handlers = [
  withActiveMockGate('CreateCart', createCartSuccess),
  withActiveMockGate('AddToCart', addToCartSuccess),
];

// Other paths
export const addToCartServerError = http.post(
  'http://localhost:9000/store/carts/:id/line-items',
  async () => {
    await delay(1000);

    return HttpResponse.json(
      { message: 'Failed to add to cart. Please try again.' },
      { status: 500 }
    );
  }
);

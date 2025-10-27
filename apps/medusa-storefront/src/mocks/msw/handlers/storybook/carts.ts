import { HttpResponse, delay, http } from 'msw';

import {
  mockedAddToCartResponse,
  mockedCart,
} from '../../../data/storybook/carts';

export const createCartSuccess = http.post(
  'http://localhost:9000/store/carts',
  async () => {
    await delay(1000);

    return HttpResponse.json({
      cart: mockedCart,
    });
  }
);

export const addToCartSuccess = http.post(
  'http://localhost:9000/store/carts/:id/line-items',
  async () => {
    await delay(1000);

    return HttpResponse.json({
      cart: mockedAddToCartResponse,
    });
  }
);

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

export const handlers = [createCartSuccess, addToCartSuccess];

import { HttpResponse, delay, http } from 'msw';

import { mockedAddToCartResponse, mockedCart } from '../../data/carts';

export const handlers = [
  http.post('http://localhost:9000/store/carts', async () => {
    await delay(1000);

    return HttpResponse.json({
      cart: mockedCart,
    });
  }),
  http.post('http://localhost:9000/store/carts/:id/line-items', async () => {
    await delay(1000);

    return HttpResponse.json({
      cart: mockedAddToCartResponse,
    });
  }),
];

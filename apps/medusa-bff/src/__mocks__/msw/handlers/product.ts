import { HttpResponse, http } from 'msw';

import { createMockProducts } from '@mocks/products';

export const handlers = [
  http.get('http://localhost:9000/store/products', () => {
    return HttpResponse.json({
      products: createMockProducts(5),
      count: 5,
      limit: 20,
      offset: 0,
    });
  }),
];

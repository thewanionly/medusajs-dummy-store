import { HttpResponse, http } from 'msw';

import { createMockProducts } from './products';

export const handlers = [
  http.get('http://localhost:9000/store/products', () => {
    return HttpResponse.json({
      products: createMockProducts(5),
    });
  }),
];

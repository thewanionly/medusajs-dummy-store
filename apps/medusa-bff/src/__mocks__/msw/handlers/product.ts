import { HttpResponse, http } from 'msw';

import { createMockProducts } from '@mocks/products';

/* Success (i.e. happy path) handlers */
export const handlers = [
  http.get('http://localhost:9000/store/products', () =>
    HttpResponse.json({
      products: createMockProducts(5),
      count: 5,
      limit: 20,
      offset: 0,
    })
  ),
];

/* Other handlers */
export const emptyProductsHandler = http.get(
  'http://localhost:9000/store/products',
  () =>
    HttpResponse.json({
      products: [],
      count: 0,
      limit: 20,
      offset: 0,
    })
);

export const networkTimeoutErrorHandler = http.get(
  'http://localhost:9000/store/products',
  () => HttpResponse.json({ message: 'Network timeout' }, { status: 504 })
);

export const internalServerErrorHandler = http.get(
  'http://localhost:9000/store/products',
  () => HttpResponse.json({ message: 'Internal server error' }, { status: 500 })
);

export const rateLimitExceededErrorHandler = http.get(
  'http://localhost:9000/store/products',
  () => HttpResponse.json({ message: 'Rate limit exceeded' }, { status: 429 })
);

export const invalidProductDataHandler = http.get(
  'http://localhost:9000/store/products',
  () =>
    HttpResponse.json({
      products: [
        { id: 'valid_prod', title: 'Valid Product' },
        null,
        undefined,
        { id: 'another_valid', title: 'Another Valid' },
      ],
      count: 0,
      limit: 20,
      offset: 0,
    })
);

export const largeDataSetsHandler = http.get(
  'http://localhost:9000/store/products',
  () =>
    HttpResponse.json({
      products: createMockProducts(1000),
      count: 1000,
      limit: 1000,
      offset: 0,
    })
);

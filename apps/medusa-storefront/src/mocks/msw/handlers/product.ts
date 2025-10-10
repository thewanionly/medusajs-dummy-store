import { HttpResponse } from 'msw';

import { mockedProduct } from '../../data/product';
import { medusaBff } from '../apis';

export const handlers = [
  medusaBff.query('GetProducts', () => {
    return HttpResponse.json({
      data: {
        products: {
          products: [mockedProduct],
          count: 1,
          limit: 50,
          offset: 0,
        },
      },
    });
  }),
];

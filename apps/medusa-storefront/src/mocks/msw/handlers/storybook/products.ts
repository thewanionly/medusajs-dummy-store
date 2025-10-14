import { HttpResponse } from 'msw';

import { mockedProducts } from '../../../data/storybook/products';
import { medusaBff } from '../../apis';

export const handlers = [
  medusaBff.query('GetProducts', () => {
    return HttpResponse.json({
      data: {
        products: {
          products: mockedProducts,
          count: mockedProducts.length,
          limit: 50,
          offset: 0,
        },
      },
    });
  }),
];

import { HttpResponse, passthrough } from 'msw';

import { mockedProducts } from '../../data/product';
import { activeGqlMocks } from '../activeMocks';
import { medusaBff } from '../apis';

export const handlers = [
  medusaBff.query('GetProducts', () => {
    if (!activeGqlMocks.GetUser) {
      return passthrough();
    }

    return HttpResponse.json({
      data: {
        products: {
          products: mockedProducts,
          count: mockedProducts.length,
        },
      },
    });
  }),
];

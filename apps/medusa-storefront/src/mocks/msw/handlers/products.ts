import { HttpResponse, passthrough } from 'msw';

import { mockedProducts } from '../../data/products';
import { activeGqlMocks } from '../activeMocks';
import { medusaBff } from '../apis';

export const getProductsSuccess = medusaBff.query('GetProducts', () => {
  if (!activeGqlMocks.GetProducts) {
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
});

export const handlers = [getProductsSuccess];

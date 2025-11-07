import { HttpResponse } from 'msw';

import { mockedProducts } from '../../data/products';
import { medusaBff } from '../utils/apis';
import { withActiveMockGate } from '../utils/withActiveMockGate';

// Happy paths
export const getProductsSuccess = medusaBff.query('GetProducts', () => {
  return HttpResponse.json({
    data: {
      products: {
        products: mockedProducts,
        count: mockedProducts.length,
      },
    },
  });
});

// Handlers used in the application.
// Use `withActiveMockGate` to enable/disable the handler based on activeMock config
export const handlers = [withActiveMockGate('GetProducts', getProductsSuccess)];

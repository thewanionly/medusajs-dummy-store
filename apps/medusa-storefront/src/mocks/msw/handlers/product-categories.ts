import { HttpResponse } from 'msw';

import { mockedProductCategories } from '../../data/product-categories';
import { storefrontMedusaBffWrapper } from '../utils/apis';
import { withActiveMockGate } from '../utils/withActiveMockGate';

// Happy paths
export const getProductCategoriesSuccess = storefrontMedusaBffWrapper.query(
  'GetProductCategories',
  () => {
    return HttpResponse.json({
      data: {
        productCategories: mockedProductCategories,
      },
    });
  }
);

// Handlers used in the application.
// Use `withActiveMockGate` to enable/disable the handler based on activeMock config
export const handlers = [
  withActiveMockGate('GetProductCategories', getProductCategoriesSuccess),
];

import { HttpResponse, passthrough } from 'msw';

import { mockedProductCategories } from '../../data/product-categories';
import { activeGqlMocks } from '../activeMocks';
import { medusaBff } from '../apis';

export const getProductCategoriesSuccess = medusaBff.query(
  'GetProductCategories',
  () => {
    if (!activeGqlMocks.GetProductCategories) {
      return passthrough();
    }

    return HttpResponse.json({
      data: {
        productCategories: mockedProductCategories,
      },
    });
  }
);

export const handlers = [getProductCategoriesSuccess];

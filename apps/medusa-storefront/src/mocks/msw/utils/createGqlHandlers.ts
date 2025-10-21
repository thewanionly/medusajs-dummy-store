import { HttpResponse, passthrough } from 'msw';

import { activeGqlMocks } from '../activeMocks';
import { medusaBff } from '../apis';

export const createGqlHandlers = (handlers: Record<string, any>[]) => {
  return handlers.map(({ queryName, response, status, resolverFn }) =>
    medusaBff.query(
      queryName,
      typeof resolverFn === 'function'
        ? resolverFn
        : () => {
            //@ts-ignore
            if (!activeGqlMocks[queryName]) {
              return passthrough();
            }

            return HttpResponse.json(response, { status });
          }
    )
  );
};

// example
// createGqlHandlers([
//   {
//     queryName: 'GetProducts',
//     response: {
//       data: {
//         products: {
//           products: mockedProducts,
//           count: mockedProducts.length,
//         },
//       },
//     },
//     status: 200,
//   },
// ]);

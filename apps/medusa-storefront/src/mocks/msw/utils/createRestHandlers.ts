import { HttpResponse, http } from 'msw';

export const createRestHandlers = (handlers: Record<string, any>[]) => {
  return handlers.map(({ method, url, response, status, resolverFn }) => {
    // TODO: reference activeHttpMocks
    if (method === 'post')
      return http.post(
        url,
        typeof resolverFn === 'function'
          ? resolverFn
          : async () => {
              return HttpResponse.json(response, { status });
            }
      );
  });
};

// example
// createRestHandlers([
//   {
//     method: 'post',
//     url: 'http://localhost:9000/auth/customer/emailpass',
//     response: {
//       type: 'unauthorized',
//       message: 'Invalid email or password',
//     },
//     status: 401,
//   },
// ]);

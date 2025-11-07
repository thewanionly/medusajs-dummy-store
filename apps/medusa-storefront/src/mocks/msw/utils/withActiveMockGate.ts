import { GraphQLHandler, HttpHandler, passthrough } from 'msw';

import { activeMocks } from './activeMocks';

type ActiveMockKey = keyof typeof activeMocks;

export const withActiveMockGate = (
  key: ActiveMockKey,
  handler: GraphQLHandler | HttpHandler
): GraphQLHandler | HttpHandler => {
  if (!activeMocks[key]) {
    // swap the handler's resolver with one that calls `passthrough` to bypass the handler's logic
    const passthroughHandler = handler as typeof handler & {
      resolver: () => ReturnType<typeof passthrough>;
    };

    passthroughHandler.resolver = () => passthrough();
  }

  return handler;
};

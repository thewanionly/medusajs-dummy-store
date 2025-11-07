import { GraphQLHandler, HttpHandler } from 'msw';

import { activeMocks } from './activeMocks';

type ActiveMockKey = keyof typeof activeMocks;

export const withActiveMockGate = (
  key: ActiveMockKey,

  handler: GraphQLHandler | HttpHandler
): GraphQLHandler | HttpHandler | undefined => {
  if (!activeMocks[key]) {
    return undefined;
  }

  return handler;
};

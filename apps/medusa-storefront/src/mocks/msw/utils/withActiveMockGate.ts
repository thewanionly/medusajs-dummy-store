import { GraphQLHandler, HttpHandler, passthrough } from 'msw';

import { activeMocks } from './activeMocks';

type ActiveMockKey = keyof typeof activeMocks;

export const withActiveMockGate = (
  key: ActiveMockKey,
  handler: GraphQLHandler | HttpHandler
) => {
  if (!activeMocks[key]) {
    return passthrough;
  }

  return handler;
};

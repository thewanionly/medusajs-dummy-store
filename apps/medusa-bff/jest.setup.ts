import { setupServer } from 'msw/node';

import { handlers } from './src/__mocks__/handlers';

export const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

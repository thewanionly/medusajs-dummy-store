import nextJest from 'next/jest.js';

import { jestConfig } from '@mds/jest-config/base';

const createJestConfig = nextJest({
  dir: '../medusa-storefront',
});

module.exports = async () => ({
  ...(await createJestConfig(jestConfig)()),
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
});

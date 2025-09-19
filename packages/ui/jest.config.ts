import nextJest from 'next/jest.js';

import type { Config } from 'jest';

import { storefrontJestConfig } from '@mds/jest-config/base';

const createJestConfig = nextJest({
  dir: '../../apps/medusa-storefront',
});
const config: Config = {
  ...storefrontJestConfig,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default createJestConfig(config) as unknown as Config;

import { config } from '@mds/eslint-config/base';

/** @type {import("eslint").Linter.Config} */
export default [
  ...config,
  {
    ...config.ignores,
    ignores: ['.medusa/', '.yalc/', 'node_modules/', 'yalc.lock'],
  },
];

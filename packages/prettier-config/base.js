/** @type {import("prettier").Config} */
export default {
  arrowParens: 'always',
  printWidth: 80,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  useTabs: false,
  importOrder: [
    '^(react$)|^(react/(.*)$)',
    '^(next$)|^(next/(.*)$)',
    '<THIRD_PARTY_MODULES>',
    '^@(.*)$',
    '^([./])|^([../])',
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: '../medusa-bff/src/graphql/schemas/*.graphql',
  documents: ['src/lib/bff/**/*.{ts,tsx}'],
  generates: {
    './src/lib/bff/generated-types/graphql.ts': {
      plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
      config: {
        useTypeImports: true,
        documentMode: 'documentNode',
        gqlImport: '@apollo/client#gql',
        dedupeFragments: true,
        inlineFragmentTypes: 'combine',
        skipTypename: false,
        exportFragmentSpreadSubTypes: true,
        addUnderscoreToArgsType: true,
      },
    },
  },
  ignoreNoDocuments: false,
};

export default config;

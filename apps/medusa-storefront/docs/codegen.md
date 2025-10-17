# Code Generation Guide

This document outlines the steps and notes for generating TypeScript types from GraphQL schema in the Medusa storefront application.

## Overview

The storefront uses GraphQL Code Generator to automatically generate TypeScript types from the GraphQL schema and operations. This ensures type safety between the frontend and the BFF (Backend for Frontend) layer.

## Prerequisites

- Node.js and pnpm installed
- GraphQL schema files available at `../medusa-bff/src/graphql/schemas/`
- GraphQL operations defined in TypeScript files within `src/lib/gql/`

## Step-by-Step Generation Process

### 1. Install Dependencies

Ensure all required dependencies are installed:

```bash
pnpm install
```

Key codegen dependencies:

- `@graphql-codegen/cli` - Main CLI tool
- `@graphql-codegen/typescript` - Generates TypeScript types
- `@graphql-codegen/typescript-operations` - Generates operation types
- `@graphql-codegen/typed-document-node` - Generates typed document nodes

### 2. Verify Schema File

Ensure the GraphQL schema exists at:

```
apps/medusa-bff/src/graphql/schemas/
```

This file contains the complete GraphQL schema definition including:

- Query types
- Product types
- Collection types
- Category types
- Custom scalars (DateTime, JSON)

### 3. Check GraphQL Operations

Verify that GraphQL operations (queries, mutations, fragments) are defined in:

```
src/lib/gql/**/*.{ts,tsx}
```

### 4. Run Code Generation

Execute one of the following commands:

#### One-time Generation

```bash
pnpm run codegen
```

#### Watch Mode (for development)

```bash
pnpm run codegen:watch
```

### 5. Verify Generated Files

Check that types are generated at:

```
src/lib/gql/generated-types/graphql.ts
```

## Configuration Details

The codegen configuration is defined in `codegen.ts`:

```typescript
{
  overwrite: true,
  schema: '../medusa-bff/src/graphql/schemas/*.graphql',
  documents: ['src/lib/gql/**/*.{ts,tsx}'],
  generates: {
    './src/lib/gql/generated-types/graphql.ts': {
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
}
```

## Important Notes

### Configuration Options

- **useTypeImports**: Uses `import type` for TypeScript imports
- **documentMode**: Uses `documentNode` for Apollo Client compatibility
- **dedupeFragments**: Removes duplicate fragment definitions
- **skipTypename**: Keeps `__typename` fields in generated types
- **exportFragmentSpreadSubTypes**: Exports subtypes for fragment spreads

### File Structure

```
../medusa-bff/src/graphql/schemas/
├── **.graphql             # GraphQL schema definition
src/lib/gql/
├── schema.graphql         # GraphQL schema definition
├── generated-types/
│   └── graphql.ts         # Generated TypeScript types
├── fragments/
│   └── product.ts         # GraphQL fragments
├── queries/
│   └── product.ts         # GraphQL queries
```

### Best Practices

1. **Always regenerate types after schema changes**
2. **Use fragments for reusable field selections**
3. **Keep operations in separate files for better organization**
4. **Use meaningful names for queries and mutations**
5. **Test generated types with TypeScript compiler**

### Development Workflow

1. Modify GraphQL schema or operations
2. Run `pnpm run codegen` or use watch mode
3. Import generated types in your components
4. Use TypeScript compiler to verify type safety

### Troubleshooting

If generation fails:

1. Check schema syntax
2. Verify all imports in operation files
3. Clear node_modules and reinstall
4. Check codegen configuration syntax

## Example Usage

After generation, use the types in your components:

```typescript
import { useQuery } from '@apollo/client';
import { GetProductQuery, GetProductDocument } from '../generated-types/graphql';

const ProductComponent = ({ productId }: { productId: string }) => {
  const { data, loading, error } = useQuery<GetProductQuery>(
    GetProductDocument,
    { variables: { id: productId } }
  );

  // TypeScript now knows the exact shape of data
  return <div>{data?.product?.title}</div>;
};
```

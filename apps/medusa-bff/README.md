# BFF GraphQL API

A Backend for Frontend (BFF) GraphQL API that serves as a data layer between your frontend applications and the Medusa backend.

## Features

- GraphQL API with Apollo Server
- Direct integration with Medusa Store API
- Product queries support
- CORS enabled for frontend consumption

### Environment Configuration

Copy the `.env.example` to `.env` and configure:

```bash
MEDUSA_API_URL=http://localhost:9000
PORT=4000
```

The GraphQL playground will be available at: <http://localhost:4000/graphql>

## Running Locally

### Prerequisites

1. Ensure the Medusa backend is running on `http://localhost:9000`
2. Copy `.env.example` to `.env` and configure the environment variables

### Development

```bash
# Install dependencies
pnpm install

# Start the development server with hot reload
pnpm run dev
```

The GraphQL server will start on `http://localhost:4000` with the following endpoints:

- **GraphQL Playground**: `http://localhost:4000/graphql`
- **GraphQL API**: `http://localhost:4000/graphql`

### Accessing Apollo Server

After starting the development server, open your browser and navigate to:

```
http://localhost:4000/graphql
```

This will open the Apollo Server Studio interface where you can:

- Explore the GraphQL schema
- Execute queries and mutations
- View documentation for available operations
- Test API endpoints interactively

### Production Build

```bash
# Build the project
pnpm run build

# Start the production server
pnpm start
```

### Available Scripts

- `pnpm run dev` - Start development server with hot reload
- `pnpm run build` - Build the project for production (includes codegen)
- `pnpm run start` - Start the production server
- `pnpm run lint` - Run ESLint
- `pnpm run check-types` - Run TypeScript type checking
- `pnpm run codegen` - Generate TypeScript types from GraphQL schema
- `pnpm run codegen:watch` - Watch mode for type generation during development
- `pnpm run generate-schema` - Generate GraphQL schema file using Apollo Rover
- `pnpm run publish-schema` - Publish schema to Apollo Studio

## Project Structure

References
[GraphQL-Starter](https://github.com/cerinoligutom/GraphQL-Starter/tree/main/src/graphql)
[Apollographql](https://github.com/apollographql/subgraph-template-typescript-apollo-server-boilerplate/tree/main/src)
[Graphql-boilerplates](https://github.com/graphql-boilerplates/typescript-graphql-server/tree/master/basic/src)
[GraphQL-Starter-API](https://github.com/tomwray13/graphql-typescript-api-starter/tree/main/src)

```
src/
├── index.ts                    # Apollo Server setup and configuration
├── graphql/
│   ├── generated/
│   │   └── graphql.ts         # Auto-generated TypeScript types
│   ├── schemas/
│   │   ├── base.ts            # Base GraphQL schema definitions
│   │   ├── product.graphql    # Product-specific GraphQL schema
│   │   └── index.ts           # Combined schema exports
│   ├── resolvers/
│   │   ├── product.ts         # Product query resolvers
│   │   └── index.ts           # Combined resolver exports
│   └── types/
│       └── context.ts         # GraphQL context type definitions
└── services/
    ├── medusa/
    │   ├── types.ts           # Medusa API type definitions
    │   ├── product.ts         # Product service implementation
    │   └── index.ts           # Main Medusa API client
    └── index.ts               # Service layer exports
```

## GraphQL Code Generation

This project uses GraphQL Code Generator to automatically generate TypeScript types from the GraphQL schema. This eliminates the need for manual type definitions and ensures type safety between your schema and resolvers.

### Configuration

The codegen configuration is defined in `codegen.ts`:

```typescript
import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'src/graphql/schemas/**/*.graphql',
  generates: {
    'src/graphql/generated/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useTypeImports: true,
        contextType: '../types/context#GraphQLContext',
        skipTypename: true,
        scalars: {
          JSON: '{ [key: string]: unknown }',
          DateTime: 'string',
        },
        enumsAsTypes: true,
      },
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },
};

export default config;
```

### Usage

Generate types from your GraphQL schema:

```bash
# Generate types once
pnpm run codegen

# Watch for schema changes and regenerate automatically
pnpm run codegen:watch
```

The generated types are automatically included in the build process, so running `pnpm run build` will also generate the latest types.

### Generated Types

The codegen generates TypeScript types for:

- **GraphQL Types**: All types defined in your `.graphql` schema files
- **Resolver Types**: Properly typed resolvers with context and argument types
- **Scalar Types**: Custom scalar mappings (JSON, DateTime)
- **Context Types**: Integration with your GraphQL context interface

### Benefits

- **Type Safety**: Automatic type checking between schema and resolvers
- **Auto-completion**: IDE support for GraphQL operations
- **Refactoring**: Safe renaming and restructuring of GraphQL types
- **Documentation**: Generated types serve as living documentation

## Writing Schema, Resolvers and Services

### 1. Creating GraphQL Schemas

GraphQL schemas define the structure of your API. Create new schema files as `.graphql` files in `src/graphql/schemas/`:

```graphql
# src/graphql/schemas/example.graphql
scalar DateTime
scalar JSON

type Query {
  examples: [Example!]!
  example(id: ID!): Example
}

type Mutation {
  createExample(input: CreateExampleInput!): Example!
}

type Example {
  id: ID!
  name: String!
  description: String
  status: String
  metadata: JSON
  created_at: DateTime!
  updated_at: DateTime!
}

input CreateExampleInput {
  name: String!
  description: String
  metadata: JSON
}
```

The schema files are automatically loaded by the schema index file using glob patterns. Any `.graphql` file in the schemas directory will be automatically merged with the base schema.

### 2. Implementing Resolvers

Resolvers handle the business logic for your GraphQL operations. Create resolver files in `src/graphql/resolvers/`:

```typescript
// src/graphql/resolvers/example.ts
import type { Resolvers } from '@graphql/generated/graphql';

import { GraphQLContext } from '../types/context';

export const exampleResolvers: Resolvers<GraphQLContext> = {
  Query: {
    examples: async (_parent, _args, context) => {
      return context.exampleService.getAll();
    },
    example: async (_parent, { id }, context) => {
      return context.exampleService.getById(id);
    },
  },
  Mutation: {
    createExample: async (_parent, { input }, context) => {
      return context.exampleService.create(input);
    },
  },
};
```

Add the resolver to the main resolver index:

```typescript
// src/graphql/resolvers/index.ts
import { exampleResolvers } from './example';

export const resolvers = [
  productResolvers,
  exampleResolvers, // Add your new resolver here
];
```

### 3. Creating Services

Services contain the business logic and external API calls. Create service files in `src/services/`:

```typescript
// src/services/example.ts
import type { CreateExampleInput, Example } from '@graphql/generated/graphql';

export class ExampleService {
  private apiClient: any;

  constructor(apiClient: any) {
    this.apiClient = apiClient;
  }

  async getAll(): Promise<Example[]> {
    try {
      const response = await this.apiClient.get('/examples');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch examples: ${error.message}`);
    }
  }

  async getById(id: string): Promise<Example | null> {
    try {
      const response = await this.apiClient.get(`/examples/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch example ${id}: ${error.message}`);
    }
  }

  async create(input: CreateExampleInput): Promise<Example> {
    try {
      const response = await this.apiClient.post('/examples', input);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create example: ${error.message}`);
    }
  }
}
```

Register the service in the service index:

```typescript
// src/services/index.ts
import { ExampleService } from './example';

export const createServices = (apiClient: any) => ({
  medusa: createMedusaServices(apiClient),
  example: new ExampleService(apiClient),
});
```

### 4. Updating Context Types

Add your service types to the GraphQL context:

```typescript
// src/graphql/types/context.ts
export interface GraphQLContext {
  productService: ProductService;
  collectionService: CollectionService;
  categoryService: CategoryService;
  exampleService: ExampleService; // Add your service type here
}
```

## Apollo Rover Integration

This BFF service is configured for Apollo Federation using Apollo Rover CLI. The service can be used as a subgraph in an Apollo Gateway setup.

### Prerequisites

- Apollo Rover CLI installed (available via `@apollo/rover` package)
- Apollo Studio account and graph configured (for publishing)

### Available Rover Scripts

#### Authentication

To authenticate with Apollo Rover, you need to create a Personal API Key in the Apollo Studio dashboard.

```bash
rover config auth
```

#### Generate Schema

Introspects the running GraphQL server and generates a `schema.graphql` file:

```bash
pnpm run generate-schema
```

This command:

- Connects to the BFF server at `http://localhost:4000/graphql` (or the URL specified in `BFF_URL`)
- Introspects the GraphQL schema
- Outputs the federation-compatible schema to `schema.graphql`

**Note**: The BFF server must be running before executing this command.

#### Publish Schema

Publishes the generated schema to Apollo Studio:

```bash
pnpm run publish-schema
```

This command:

- Reads the `schema.graphql` file
- Publishes it to Apollo Studio as a subgraph named "bff"
- Uses the routing URL from `BFF_URL` environment variable (defaults to `http://localhost:4000/graphql`)

### Environment Configuration

Add these environment variables to your `.env` file:

```bash
# Apollo Studio Configuration
APOLLO_GRAPH_REF="your-graph-id@current"  # Your Apollo Studio graph reference
APOLLO_GRAPH_ROUTING_URL="your-graph-routing-url"  # Your Apollo Studio graph routing URL
```

### Workflow Example

1. Start the BFF development server:

   ```bash
   pnpm run dev
   ```

2. Generate the schema file:

   ```bash
   pnpm run generate-schema
   ```

3. Publish to Apollo Studio (requires `APOLLO_GRAPH_REF` to be set):
   ```bash
   pnpm run publish-schema
   ```

### Federation Features

This subgraph includes:

- Apollo Federation v2 directives (`@key`, `@external`, `@requires`, `@provides`, etc.)
- Subgraph service metadata (`_service` field)
- Compatible with Apollo Gateway composition

### Best Practices

- **Error Handling**: Always wrap service calls in try-catch blocks
- **Type Safety**: Use generated TypeScript types from `@graphql/generated/graphql`
- **Code Generation**: Run `pnpm run codegen` after schema changes
- **Naming**: Use consistent naming conventions (camelCase for fields, PascalCase for types)
- **Documentation**: Add descriptions to your GraphQL schema fields
- **Testing**: Write unit tests for your resolvers and services
- **Schema-First**: Define your GraphQL schema first, then implement resolvers and services
- **Schema Management**: Regenerate and republish schema after significant changes

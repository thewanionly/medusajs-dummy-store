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
- `pnpm run build` - Build the project for production
- `pnpm start` - Start the production server
- `pnpm run lint` - Run ESLint
- `pnpm run check-types` - Run TypeScript type checking

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
│   ├── schemas/
│   │   ├── base.ts            # Base GraphQL schema definitions
│   │   ├── product.ts         # Product-specific type definitions
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
import { Context } from '../types/context';

export const exampleResolvers = {
  Query: {
    examples: async (_: unknown, __: unknown, context: Context) => {
      return context.services.example.getAll();
    },
    example: async (_: unknown, { id }: { id: string }, context: Context) => {
      return context.services.example.getById(id);
    },
  },
  Mutation: {
    createExample: async (
      _: unknown,
      { input }: { input: CreateExampleInput },
      context: Context
    ) => {
      return context.services.example.create(input);
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
export class ExampleService {
  private apiClient: any;

  constructor(apiClient: any) {
    this.apiClient = apiClient;
  }

  async getAll() {
    try {
      const response = await this.apiClient.get('/examples');
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch examples: ${error.message}`);
    }
  }

  async getById(id: string) {
    try {
      const response = await this.apiClient.get(`/examples/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch example ${id}: ${error.message}`);
    }
  }

  async create(input: CreateExampleInput) {
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
export interface Context {
  services: {
    medusa: MedusaServices;
    example: ExampleService; // Add your service type here
  };
}
```

### Best Practices

- **Error Handling**: Always wrap service calls in try-catch blocks
- **Type Safety**: Use TypeScript interfaces for all inputs and outputs
- **Naming**: Use consistent naming conventions (camelCase for fields, PascalCase for types)
- **Documentation**: Add descriptions to your GraphQL schema fields
- **Testing**: Write unit tests for your resolvers and services

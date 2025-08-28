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

## Project Structure

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

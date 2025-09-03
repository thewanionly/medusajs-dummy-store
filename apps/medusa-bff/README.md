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

# MedusaJS Dummy Store Monorepo

## Pre-requisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en/download) (v20+)
- [pnpm](https://pnpm.io/installation)
- [PostgreSQL](https://www.postgresql.org/download/)

## Local Development Setup Instructions

1. In the **root directory**, use `pnpm` to install all dependencies specified in all package.json files across all packages.

   ```
   pnpm install
   ```

2. Go to `apps/medusa` and follow the setup instructions in that package's [README](apps/medusa/README.md) for running the backend development server and local PostgreSQL database.

   ```
   cd apps/medusa
   ```

3. Once the backend development server and local PostgreSQL database are running, go to `apps/medusa-storefront` and follow the setup instructions in that package's [README](apps/medusa-storefront/README.md) for running the storefront development server.

   ```
   cd apps/medusa-storefront
   ```

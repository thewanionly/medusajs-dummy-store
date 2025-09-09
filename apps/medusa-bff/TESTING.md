# Testing Guide for Medusa BFF GraphQL API

This comprehensive guide outlines testing practices, patterns, configuration, and guidelines for the Medusa BFF GraphQL API project.

## Current Test Status

### Enhanced Test Coverage

- **9+ tests total** across all layers
- **14 resolver tests** - GraphQL layer testing
- **23 service tests** - Business logic testing
- **9+ schema tests** - GraphQL schema validation testing

### Coverage Requirements: 80%

Our project enforces a minimum of 80% coverage

## Test Structure

### Folder Organization

Tests are organized in a central `__tests__` folder structure:

```
src/
├── index.ts                     # Apollo Server entrypoint
├── graphql/
│   ├── schemas/
│   │   ├── product.ts
│   │   └── index.ts
│   ├── resolvers/
│   │   ├── product.ts
│   │   └── index.ts
│   └── types/
│       └── context.ts
├── services/
│   ├── medusa/
│   │   ├── product.ts
│   │   └── index.ts
│   └── index.ts
└── __tests__/                   # Central test folder
    ├── graphql/
    │   ├── resolvers/
    │   │   └── product.test.ts
    │   └── schemas/
    │       └── product.test.ts
    └── services/
        └── medusa/
            └── product.test.ts
```

### Coverage Exclusions

The following files are excluded from coverage requirements:

- Type definition files (`*.d.ts`)
- Entry point (`src/index.ts`)
- Test files themselves
- Configuration files

## Testing Best Practices

### 1. Apollo Server v4 Testing (IMPORTANT)

**DO use Apollo Server v4's `executeOperation`** method:

```typescript
import { ApolloServer } from '@apollo/server';

const server = new ApolloServer<TestContext>({
  typeDefs,
  resolvers,
});

const response = await server.executeOperation(
  {
    query: PRODUCTS_QUERY,
    variables: { id: 'prod_1' },
  },
  {
    contextValue: {
      productService: mockProductService,
    },
  }
);
```

### 2. Test Data Factories

Use factory functions for consistent, reusable test data:

```typescript
const createMockProduct = (overrides = {}) => ({
  id: 'prod_1',
  title: 'Test Product',
  handle: 'test-product',
  description: 'A test product description',
  // ... all required fields
  ...overrides,
});

const createMockProducts = (count = 3) =>
  Array.from({ length: count }, (_, i) =>
    createMockProduct({
      id: `prod_${i + 1}`,
      title: `Product ${i + 1}`,
      handle: `product-${i + 1}`,
    })
  );
```

### 3. Mock Management

```typescript
//  Centralized mock management
const mockMedusaApi = {
  store: {
    product: {
      list: jest.fn(),
      retrieve: jest.fn(),
    },
  },
};

jest.mock('@medusajs/js-sdk', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => mockMedusaApi),
}));

//  Proper cleanup
beforeEach(() => {
  jest.clearAllMocks();
  consoleSpy = jest.spyOn(console, 'error').mockImplementation();
});

afterEach(() => {
  consoleSpy.mockRestore();
});
```

### 4. Test Organization

```typescript
describe('ComponentName', () => {
  describe('methodName', () => {
    it('should do something when condition is met', () => {
      // Test implementation
    });

    it('should handle error cases gracefully', () => {
      // Error handling test
    });
  });
});
```

## Testing Patterns by Layer

### 1. GraphQL Resolver Testing

```typescript
import { ProductService } from '../../../services/medusa/product';
import { productResolvers } from '../product';

describe('Product Resolvers', () => {
  let mockProductService: jest.Mocked<ProductService>;
  let mockContext: { productService: jest.Mocked<ProductService> };

  beforeEach(() => {
    mockProductService = {
      getProducts: jest.fn(),
      getProduct: jest.fn(),
    } as unknown as jest.Mocked<ProductService>;

    mockContext = {
      productService: mockProductService,
    };
  });

  describe('Query.products', () => {
    it('should return multiple products successfully', async () => {
      const mockProducts = createMockProducts(3);
      mockProductService.getProducts.mockResolvedValue(mockProducts as any);

      const result = await productResolvers.Query.products(
        null,
        {},
        mockContext
      );

      expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProducts);
      expect(result).toHaveLength(3);
    });

    it('should handle service errors gracefully', async () => {
      const serviceError = new Error('Database connection failed');
      mockProductService.getProducts.mockRejectedValue(serviceError);

      await expect(
        productResolvers.Query.products(null, {}, mockContext)
      ).rejects.toThrow('Database connection failed');
    });
  });
});
```

### 2. Service Layer Testing

```typescript
import { ProductService } from '../product';

const mockMedusaApi = {
  store: {
    product: {
      list: jest.fn(),
      retrieve: jest.fn(),
    },
  },
};

jest.mock('@medusajs/js-sdk', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => mockMedusaApi),
}));

describe('ProductService', () => {
  let productService: ProductService;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    productService = new ProductService('http://localhost:9000', 'test-key');
    (productService as any).medusa = mockMedusaApi;
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('getProducts', () => {
    it('should return products when API call is successful', async () => {
      const mockProducts = createMockProducts(5);
      mockMedusaApi.store.product.list.mockResolvedValue({
        products: mockProducts,
        count: 5,
        limit: 20,
        offset: 0,
      });

      const result = await productService.getProducts();

      expect(mockMedusaApi.store.product.list).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProducts);
    });

    it('should handle network errors gracefully', async () => {
      const networkError = new Error('Network timeout');
      mockMedusaApi.store.product.list.mockRejectedValue(networkError);

      const result = await productService.getProducts();

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching products:',
        'Network timeout'
      );
    });
  });
});
```

### 3. Integration Testing

```typescript
import { ApolloServer } from '@apollo/server';

import { ProductService } from '../../services/medusa/product';
import { resolvers } from '../resolvers';
import { typeDefs } from '../schemas';

interface TestContext {
  productService: jest.Mocked<ProductService>;
}

describe('GraphQL Integration Tests', () => {
  let server: ApolloServer<TestContext>;
  let mockProductService: jest.Mocked<ProductService>;

  beforeAll(async () => {
    server = new ApolloServer<TestContext>({
      typeDefs,
      resolvers,
    });
  });

  describe('Products Query', () => {
    const PRODUCTS_QUERY = `
      query GetProducts {
        products {
          id
          title
          handle
          description
        }
      }
    `;

    it('should return products successfully', async () => {
      const mockProducts = [
        { id: 'prod_1', title: 'Test Product 1' },
        { id: 'prod_2', title: 'Test Product 2' },
      ];

      mockProductService.getProducts.mockResolvedValue(mockProducts as any);

      const response = await server.executeOperation(
        { query: PRODUCTS_QUERY },
        {
          contextValue: {
            productService: mockProductService,
          },
        }
      );

      expect(response.body.kind).toBe('single');
      if (response.body.kind === 'single') {
        expect(response.body.singleResult.errors).toBeUndefined();
        expect(response.body.singleResult.data).toEqual({
          products: mockProducts,
        });
      }
    });
  });
});
```

## Running Tests

### Available Commands

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with coverage (CI mode)
npm run test:coverage:ci

# Run tests with coverage threshold enforcement
npm run test:coverage:threshold

# Run complete validation (lint + types + tests + build)
npm run validate

# CI pipeline
npm run ci

# Run specific test suites
npm test -- resolver
npm test -- service
npm test -- schema
```

### Debugging Tests

```bash
# Run specific test file
npm test -- product.test.ts

# Run with verbose output
npm test -- --verbose

# Debug mode
node --inspect-brk node_modules/.bin/jest --runInBand
```

import {
  emptyProductsHandler,
  internalServerErrorHandler,
  invalidProductDataHandler,
  largeDataSetsHandler,
  networkTimeoutErrorHandler,
  productNotFoundHandler,
  publishableKeyRequiredHandler,
  rateLimitExceededErrorHandler,
  rateLimitExceededProductErrorHandler,
  unauthorizedAccessHandler,
} from '@mocks/msw/handlers/product';
import { server } from '@mocks/msw/node';
import {
  createMockProduct,
  createMockProducts,
  mockMedusaApi,
} from '@mocks/products';
import { ProductService } from '@services/medusa/product';

describe('ProductService', () => {
  let productService: ProductService;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    productService = new ProductService('http://localhost:9000', 'test-key');
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('constructor', () => {
    it('should initialize correctly with and without publishable key', () => {
      const serviceWithKey = new ProductService(
        'http://custom-url:8000',
        'custom-key'
      );
      const serviceWithoutKey = new ProductService('http://localhost:9000');

      expect(serviceWithKey).toBeInstanceOf(ProductService);
      expect(serviceWithoutKey).toBeInstanceOf(ProductService);
    });
  });

  describe('getProducts', () => {
    it('should handle successful response', async () => {
      const mockProducts = createMockProducts(5);

      const result = await productService.getProducts();

      expect(result.products).toEqual(mockProducts);
      expect(result.products).toHaveLength(5);
      expect(result.count).toBe(5);
      expect(result.limit).toBe(20);
      expect(result.offset).toBe(0);
    });

    it('should handle empty response', async () => {
      server.use(emptyProductsHandler);

      const result = await productService.getProducts();

      expect(result.products).toEqual([]);
      expect(result.products).toHaveLength(0);
      expect(result.count).toBe(0);
      expect(result.limit).toBe(20);
      expect(result.offset).toBe(0);
    });

    it('should throw GraphQL errors for different scenarios', async () => {
      const errorScenarios = [
        {
          error: new Error('Network timeout'),
          expectedError: 'ServiceUnavailableError',
        },
        {
          error: new Error('Internal server error'),
          expectedError: 'MedusaServiceError',
        },
        {
          error: new Error('Rate limit exceeded'),
          expectedError: 'MedusaServiceError',
        },
      ];

      for (const scenario of errorScenarios) {
        mockMedusaApi.store.product.list.mockRejectedValue(scenario.error);

        await expect(productService.getProducts()).rejects.toThrow();
      }
    });

    xit('should handle invalid data and large datasets', async () => {
      jest.clearAllMocks();
      consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    it('should handle Rate limit exceeded error scenario and return empty array', async () => {
      server.use(rateLimitExceededErrorHandler);

      const error = new Error('Rate limit exceeded');

      const result = await productService.getProducts();

      expect(result.products).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching products:',
        error.message
      );

      jest.clearAllMocks();
      consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    it('should handle invalid data', async () => {
      server.use(invalidProductDataHandler);

      const result = await productService.getProducts();

      expect(result.products).toHaveLength(4);
      expect(result.products[1]).toBeNull();
      expect(result.products[2]).toBeNull();
    });

    it('should handle large datasets', async () => {
      server.use(largeDataSetsHandler);

      const result = await productService.getProducts();
      expect(result.products).toHaveLength(1000);
      expect(result.count).toBe(1000);
      expect(result.limit).toBe(1000);
      expect(result.offset).toBe(0);
    });
  });

  describe('getProduct', () => {
    it('should handle successful retrieval of a product', async () => {
      const mockProduct = createMockProduct();

      const result = await productService.getProduct('prod_1');

      expect(result).toEqual(mockProduct);
      expect(result?.variants).toHaveLength(1);
    });

    it('should throw GraphQL errors for different scenarios', async () => {
      const errorScenarios = [
        {
          error: new Error(`Product with id: nonexistent was not found`),
          id: 'nonexistent',
          handler: productNotFoundHandler,
        },
        {
          error: new Error(
            'Publishable API key required in the request header: x-publishable-api-key. You can manage your keys in settings in the dashboard.'
          ),
          id: 'prod_1',
          handler: publishableKeyRequiredHandler,
        },
        {
          error: new Error('Unauthorized'),
          id: 'prod_1',
          handler: unauthorizedAccessHandler,
        },
        {
          error: new Error('Rate limit exceeded'),
          id: 'prod_1',
          handler: rateLimitExceededProductErrorHandler,
        },
      ];

      for (const scenario of errorScenarios) {
        mockMedusaApi.store.product.retrieve.mockRejectedValue(scenario.error);

        await expect(
          productService.getProduct(scenario.id, {})
        ).rejects.toThrow();
        jest.clearAllMocks();
      }

      mockMedusaApi.store.product.retrieve.mockResolvedValue({});
      let result = await productService.getProduct('prod_1', {});
      expect(result).toBeNull();

      mockMedusaApi.store.product.retrieve.mockResolvedValue(null);
      result = await productService.getProduct('prod_1', {});
      expect(result).toBeNull();
    });
  });

  describe('performance and monitoring', () => {
    xit('should handle concurrent requests and multiple calls without caching', async () => {
      const mockProduct = createMockProduct();
      mockMedusaApi.store.product.retrieve.mockResolvedValue({
        product: mockProduct,
      });

      await productService.getProduct('prod_1', {});
      await productService.getProduct('prod_1', {});
      await productService.getProduct('prod_2', {});

      expect(mockMedusaApi.store.product.retrieve).toHaveBeenCalledTimes(3);
      expect(mockMedusaApi.store.product.retrieve).toHaveBeenNthCalledWith(
        1,
        'prod_1',
        {}
      );
      expect(mockMedusaApi.store.product.retrieve).toHaveBeenNthCalledWith(
        2,
        'prod_1',
        {}
      );
      expect(mockMedusaApi.store.product.retrieve).toHaveBeenNthCalledWith(
        3,
        'prod_2',
        {}
      );

      const mockProducts = createMockProducts(10);
      mockMedusaApi.store.product.list.mockResolvedValue({
        products: mockProducts,
      });

      const promises = Array.from({ length: 5 }, () =>
        productService.getProducts()
      );
      const results = await Promise.all(promises);

      expect(mockMedusaApi.store.product.list).toHaveBeenCalledTimes(5);
      results.forEach((result) => {
        expect(result.products).toEqual(mockProducts);
      });
    });
  });
});

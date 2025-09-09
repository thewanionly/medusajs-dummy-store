import {
  createMockProduct,
  createMockProducts,
  mockMedusaApi,
} from '@mocks/products';
import { ProductService } from '@services/medusa/product';

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
    (productService as unknown as { medusa: typeof mockMedusaApi }).medusa =
      mockMedusaApi;
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
    it('should handle all successful and empty response scenarios', async () => {
      const mockProducts = createMockProducts(5);
      mockMedusaApi.store.product.list.mockResolvedValue({
        products: mockProducts,
        count: 5,
        limit: 20,
        offset: 0,
      });

      let result = await productService.getProducts();
      expect(result.products).toEqual(mockProducts);
      expect(result.products).toHaveLength(5);
      expect(result.count).toBe(5);
      expect(result.limit).toBe(20);
      expect(result.offset).toBe(0);

      mockMedusaApi.store.product.list.mockResolvedValue({
        products: [],
        count: 0,
      });
      result = await productService.getProducts();
      expect(result.products).toEqual([]);

      mockMedusaApi.store.product.list.mockResolvedValue({ count: 0 });
      result = await productService.getProducts();
      expect(result.products).toEqual([]);

      mockMedusaApi.store.product.list.mockResolvedValue(null);
      result = await productService.getProducts();
      expect(result.products).toEqual([]);

      mockMedusaApi.store.product.list.mockResolvedValue({ count: 0 });
      result = await productService.getProducts();
      expect(result.products).toEqual([]);

      mockMedusaApi.store.product.list.mockResolvedValue(null);
      result = await productService.getProducts();
      expect(result.products).toEqual([]);
    });

    it('should handle all error scenarios and return empty array', async () => {
      const errorScenarios = [
        new Error('Network timeout'),
        new Error('Internal server error'),
        new Error('Rate limit exceeded'),
      ];

      for (const error of errorScenarios) {
        mockMedusaApi.store.product.list.mockRejectedValue(error);
        const result = await productService.getProducts();

        expect(result.products).toEqual([]);
        expect(consoleSpy).toHaveBeenCalledWith(
          'Error fetching products:',
          error.message
        );
        jest.clearAllMocks();
        consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      }
    });

    it('should handle invalid data and large datasets', async () => {
      jest.clearAllMocks();
      consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      mockMedusaApi.store.product.list.mockResolvedValue({
        products: [
          { id: 'valid_prod', title: 'Valid Product' },
          null,
          undefined,
          { id: 'another_valid', title: 'Another Valid' },
        ],
      });

      let result = await productService.getProducts();
      expect(result.products).toHaveLength(4);
      expect(result.products[1]).toBeNull();
      expect(result.products[2]).toBeUndefined();

      jest.clearAllMocks();
      const largeProductSet = createMockProducts(1000);
      mockMedusaApi.store.product.list.mockResolvedValue({
        products: largeProductSet,
        count: 1000,
      });

      result = await productService.getProducts();
      expect(result.products).toHaveLength(1000);
      expect(mockMedusaApi.store.product.list).toHaveBeenCalledTimes(1);
    });
  });

  describe('getProduct', () => {
    it('should handle successful retrieval and complex products', async () => {
      const mockProduct = createMockProduct({
        id: 'prod_specific',
        title: 'Specific Product',
      });

      mockMedusaApi.store.product.retrieve.mockResolvedValue({
        product: mockProduct,
      });

      let result = await productService.getProduct('prod_specific');
      expect(mockMedusaApi.store.product.retrieve).toHaveBeenCalledWith(
        'prod_specific',
        {
          fields:
            '*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags',
        }
      );
      expect(result).toEqual(mockProduct);

      const complexProduct = createMockProduct({
        id: 'prod_complex',
        variants: [
          { id: 'var_1', title: 'Small', sku: 'COMPLEX-S', price: 1999 },
          { id: 'var_2', title: 'Medium', sku: 'COMPLEX-M', price: 2499 },
        ],
        metadata: {
          brand: 'Premium Brand',
          care_instructions: 'Machine wash cold',
        },
      });

      mockMedusaApi.store.product.retrieve.mockResolvedValue({
        product: complexProduct,
      });

      result = await productService.getProduct('prod_complex');
      expect(result).toEqual(complexProduct);
      expect(result?.variants).toHaveLength(2);
      expect(result?.metadata).toEqual({
        brand: 'Premium Brand',
        care_instructions: 'Machine wash cold',
      });
    });

    it('should handle all error scenarios and edge cases', async () => {
      const errorScenarios = [
        { error: new Error('Product not found'), id: 'nonexistent' },
        { error: new Error('Invalid product ID format'), id: 'invalid-id!@#' },
        { error: new Error('Product ID cannot be empty'), id: '' },
        { error: new Error('Unauthorized access'), id: 'protected_prod' },
        { error: new Error('Rate limit exceeded'), id: 'rate_limited' },
      ];

      for (const scenario of errorScenarios) {
        mockMedusaApi.store.product.retrieve.mockRejectedValue(scenario.error);
        const result = await productService.getProduct(scenario.id);

        expect(result).toBeNull();
        expect(consoleSpy).toHaveBeenCalledWith(
          'Error fetching product:',
          scenario.error.message
        );
        jest.clearAllMocks();
        consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      }

      mockMedusaApi.store.product.retrieve.mockResolvedValue({});
      let result = await productService.getProduct('prod_1');
      expect(result).toBeNull();

      mockMedusaApi.store.product.retrieve.mockResolvedValue(null);
      result = await productService.getProduct('prod_1');
      expect(result).toBeNull();

      const errorWithoutMessage = { toString: () => 'Unknown error' } as Error;
      mockMedusaApi.store.product.retrieve.mockRejectedValue(
        errorWithoutMessage
      );
      result = await productService.getProduct('prod_1');
      expect(result).toBeNull();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching product:',
        undefined
      );
    });
  });

  describe('performance and monitoring', () => {
    it('should handle concurrent requests and multiple calls without caching', async () => {
      const mockProduct = createMockProduct();
      mockMedusaApi.store.product.retrieve.mockResolvedValue({
        product: mockProduct,
      });

      await productService.getProduct('prod_1');
      await productService.getProduct('prod_1');
      await productService.getProduct('prod_2');

      expect(mockMedusaApi.store.product.retrieve).toHaveBeenCalledTimes(3);
      expect(mockMedusaApi.store.product.retrieve).toHaveBeenNthCalledWith(
        1,
        'prod_1',
        {
          fields:
            '*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags',
        }
      );
      expect(mockMedusaApi.store.product.retrieve).toHaveBeenNthCalledWith(
        2,
        'prod_1',
        {
          fields:
            '*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags',
        }
      );
      expect(mockMedusaApi.store.product.retrieve).toHaveBeenNthCalledWith(
        3,
        'prod_2',
        {
          fields:
            '*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags',
        }
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

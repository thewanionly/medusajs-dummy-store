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

      mockMedusaApi.store.product.list.mockResolvedValue({
        products: [],
        count: 0,
      });
      result = await productService.getProducts();
      expect(result.products).toEqual([]);

      mockMedusaApi.store.product.list.mockResolvedValue({
        products: [],
        count: 0,
      });
      result = await productService.getProducts();
      expect(result.products).toEqual([]);

      mockMedusaApi.store.product.list.mockResolvedValue({
        products: [],
        count: 0,
      });
      result = await productService.getProducts();
      expect(result.products).toEqual([]);
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

      let result = await productService.getProduct('prod_specific', {});
      expect(mockMedusaApi.store.product.retrieve).toHaveBeenCalledWith(
        'prod_specific',
        {}
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

      result = await productService.getProduct('prod_complex', {});
      expect(result).toEqual(complexProduct);
      expect(result?.variants).toHaveLength(2);
      expect(result?.metadata).toEqual({
        brand: 'Premium Brand',
        care_instructions: 'Machine wash cold',
      });
    });

    it('should throw GraphQL errors for different scenarios', async () => {
      const errorScenarios = [
        { error: new Error('Product not found'), id: 'nonexistent' },
        { error: new Error('Invalid product ID format'), id: 'invalid-id!@#' },
        { error: new Error('Product ID cannot be empty'), id: '' },
        { error: new Error('Unauthorized access'), id: 'protected_prod' },
        { error: new Error('Rate limit exceeded'), id: 'rate_limited' },
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

  describe('getProductCategories', () => {
    it('should handle successful category retrieval', async () => {
      const mockCategories = [
        { id: 'cat_1', name: 'Electronics', handle: 'electronics' },
        { id: 'cat_2', name: 'Clothing', handle: 'clothing' },
      ];

      mockMedusaApi.store.category.list.mockResolvedValue({
        product_categories: mockCategories,
      });

      const result = await productService.getProductCategories();
      expect(result).toEqual(mockCategories);
      expect(mockMedusaApi.store.category.list).toHaveBeenCalledWith(undefined);
    });

    it('should handle empty category response', async () => {
      mockMedusaApi.store.category.list.mockResolvedValue({
        product_categories: [],
      });

      const result = await productService.getProductCategories();
      expect(result).toEqual([]);
    });

    it('should throw error on failure', async () => {
      mockMedusaApi.store.category.list.mockRejectedValue(
        new Error('Category fetch failed')
      );

      await expect(productService.getProductCategories()).rejects.toThrow();
    });
  });

  describe('getProductCategory', () => {
    it('should handle successful single category retrieval', async () => {
      const mockCategory = {
        id: 'cat_1',
        name: 'Electronics',
        handle: 'electronics',
      };

      mockMedusaApi.store.category.retrieve.mockResolvedValue({
        product_category: mockCategory,
      });

      const result = await productService.getProductCategory('cat_1');
      expect(result).toEqual(mockCategory);
      expect(mockMedusaApi.store.category.retrieve).toHaveBeenCalledWith(
        'cat_1',
        undefined
      );
    });

    it('should return null when category not found', async () => {
      mockMedusaApi.store.category.retrieve.mockResolvedValue({});

      const result = await productService.getProductCategory('nonexistent');
      expect(result).toBeNull();
    });

    it('should throw error on failure', async () => {
      mockMedusaApi.store.category.retrieve.mockRejectedValue(
        new Error('Category not found')
      );

      await expect(
        productService.getProductCategory('invalid')
      ).rejects.toThrow();
    });
  });

  describe('performance and monitoring', () => {
    it('should handle concurrent requests and multiple calls without caching', async () => {
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

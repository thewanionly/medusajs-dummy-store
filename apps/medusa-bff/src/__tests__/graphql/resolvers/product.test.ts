import { productResolvers } from '@graphql/resolvers/product';
import { createMockProduct, createMockProducts } from '@mocks/products';
import { ProductService } from '@services/medusa/product';

describe('Product Resolvers', () => {
  let mockProductService: jest.Mocked<ProductService>;
  let mockContext: {
    productService: jest.Mocked<ProductService>;
  };

  beforeEach(() => {
    mockProductService = {
      getProducts: jest.fn(),
      getProduct: jest.fn(),
      getProductCategories: jest.fn(),
      getProductCategory: jest.fn(),
      getCollections: jest.fn(),
      getCollection: jest.fn(),
    } as unknown as jest.Mocked<ProductService>;

    mockContext = {
      productService: mockProductService,
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Query.products', () => {
    it('should handle successful responses, empty results, and data integrity', async () => {
      const mockProducts = createMockProducts(3);
      const mockResponse = {
        products: mockProducts,
        count: 3,
        limit: 20,
        offset: 0,
      };
      mockProductService.getProducts.mockResolvedValue(mockResponse as any);

      let result = await productResolvers.Query.products({}, {}, mockContext);

      expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
      expect(mockProductService.getProducts).toHaveBeenCalledWith({});
      expect(result).toEqual(mockResponse);
      expect(result.products).toHaveLength(3);

      const emptyResponse = {
        products: [],
        count: 0,
        limit: 20,
        offset: 0,
      };
      mockProductService.getProducts.mockResolvedValue(emptyResponse as any);
      result = await productResolvers.Query.products({}, {}, mockContext);
      expect(result).toEqual(emptyResponse);

      const originalProducts = JSON.parse(JSON.stringify(mockResponse));
      mockProductService.getProducts.mockResolvedValue(mockResponse as any);
      result = await productResolvers.Query.products({}, {}, mockContext);
      expect(result).toEqual(originalProducts);

      const largeProductSet = createMockProducts(1000);
      const largeResponse = {
        products: largeProductSet,
        count: 1000,
        limit: 20,
        offset: 0,
      };
      mockProductService.getProducts.mockResolvedValue(largeResponse as any);
      result = await productResolvers.Query.products({}, {}, mockContext);
      expect(result.products).toHaveLength(1000);
    });

    it('should handle all error scenarios', async () => {
      const errorScenarios = [
        'Database connection failed',
        'Request timeout',
        'Service temporarily unavailable',
      ];

      for (const errorMessage of errorScenarios) {
        const error = new Error(errorMessage);
        mockProductService.getProducts.mockRejectedValue(error);

        await expect(
          productResolvers.Query.products({}, {}, mockContext)
        ).rejects.toThrow(errorMessage);

        expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
      }

      const invalidContext = {} as {
        productService: jest.Mocked<ProductService>;
      };
      await expect(
        productResolvers.Query.products({}, {}, invalidContext)
      ).rejects.toThrow();
    });
  });

  describe('Query.product', () => {
    it('should handle successful retrieval and complex products', async () => {
      const mockProduct = createMockProduct({
        id: 'prod_123',
        title: 'Specific Product',
      });
      mockProductService.getProduct.mockResolvedValue(mockProduct as any);

      let result = await productResolvers.Query.product(
        {},
        {},
        'prod_123',
        mockContext
      );

      expect(mockProductService.getProduct).toHaveBeenCalledWith('prod_123', {});
      expect(mockProductService.getProduct).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockProduct);
      expect(result?.id).toBe('prod_123');

      const complexMockProduct = createMockProduct({
        id: 'prod_complex',
        title: 'Complex Product',
        description: 'A complex product with many properties',
        weight: 250,
        material: 'Organic Cotton',
        tags: [
          { id: 'tag_1', value: 'eco-friendly' },
          { id: 'tag_2', value: 'organic' },
        ],
        images: [
          {
            id: 'img_1',
            url: 'image1.jpg',
            rank: 0,
            created_at: '2023-01-01T00:00:00.000Z',
            updated_at: '2023-01-01T00:00:00.000Z',
            deleted_at: null,
          },
          {
            id: 'img_2',
            url: 'image2.jpg',
            rank: 1,
            created_at: '2023-01-01T00:00:00.000Z',
            updated_at: '2023-01-01T00:00:00.000Z',
            deleted_at: null,
          },
        ],
      });

      mockProductService.getProduct.mockResolvedValue(
        complexMockProduct as any
      );
      result = await productResolvers.Query.product(
        {},
        {},
        'prod_complex',
        mockContext
      );

      expect(result).toEqual(complexMockProduct);
      expect(result?.weight).toBe(250);
      expect(result?.material).toBe('Organic Cotton');
      expect(result?.tags).toEqual([
        { id: 'tag_1', value: 'eco-friendly' },
        { id: 'tag_2', value: 'organic' },
      ]);

      mockProductService.getProduct.mockResolvedValue(null);
      result = await productResolvers.Query.product(
        {},
        {},
        'nonexistent',
        mockContext
      );
      expect(result).toBeNull();
    });

    it('should handle all error scenarios and invalid inputs', async () => {
      const errorScenarios = [
        { error: 'Invalid product ID format', id: 'invalid-id-format' },
        { error: 'Service temporarily unavailable', id: 'prod_1' },
        { error: 'Access denied', id: 'prod_restricted' },
        { error: 'Product ID cannot be empty', id: '' },
      ];

      for (const scenario of errorScenarios) {
        const error = new Error(scenario.error);
        mockProductService.getProduct.mockRejectedValue(error);

        await expect(
          productResolvers.Query.product({}, {}, scenario.id, mockContext)
        ).rejects.toThrow(scenario.error);

        expect(mockProductService.getProduct).toHaveBeenCalledWith(scenario.id, {});
        jest.clearAllMocks();
      }
    });
  });

  describe('Query.productCategories', () => {
    it('should handle successful category retrieval', async () => {
      const mockCategories = [
        { id: 'cat_1', name: 'Electronics', handle: 'electronics' },
        { id: 'cat_2', name: 'Clothing', handle: 'clothing' },
      ];
      mockProductService.getProductCategories.mockResolvedValue(mockCategories as any);

      const result = await productResolvers.Query.productCategories({}, {}, mockContext);
      expect(mockProductService.getProductCategories).toHaveBeenCalledWith({});
      expect(result).toEqual(mockCategories);
    });

    it('should handle errors', async () => {
      const error = new Error('Category fetch failed');
      mockProductService.getProductCategories.mockRejectedValue(error);

      await expect(
        productResolvers.Query.productCategories({}, {}, mockContext)
      ).rejects.toThrow('Category fetch failed');
    });
  });

  describe('Query.productCategory', () => {
    it('should handle successful single category retrieval', async () => {
      const mockCategory = { id: 'cat_1', name: 'Electronics', handle: 'electronics' };
      mockProductService.getProductCategory.mockResolvedValue(mockCategory as any);

      const result = await productResolvers.Query.productCategory({}, {}, 'cat_1', mockContext);
      expect(mockProductService.getProductCategory).toHaveBeenCalledWith('cat_1', {});
      expect(result).toEqual(mockCategory);
    });

    it('should handle errors', async () => {
      const error = new Error('Category not found');
      mockProductService.getProductCategory.mockRejectedValue(error);

      await expect(
        productResolvers.Query.productCategory({}, {}, 'invalid', mockContext)
      ).rejects.toThrow('Category not found');
    });
  });

  describe('Query.collections', () => {
    it('should handle successful collection retrieval', async () => {
      const mockCollections = [
        { id: 'col_1', title: 'Summer Collection', handle: 'summer' },
        { id: 'col_2', title: 'Winter Collection', handle: 'winter' },
      ];
      mockProductService.getCollections.mockResolvedValue(mockCollections as any);

      const result = await productResolvers.Query.collections({}, {}, mockContext);
      expect(mockProductService.getCollections).toHaveBeenCalledWith({});
      expect(result).toEqual(mockCollections);
    });

    it('should handle errors', async () => {
      const error = new Error('Collection fetch failed');
      mockProductService.getCollections.mockRejectedValue(error);

      await expect(
        productResolvers.Query.collections({}, {}, mockContext)
      ).rejects.toThrow('Collection fetch failed');
    });
  });

  describe('Query.collection', () => {
    it('should handle successful single collection retrieval', async () => {
      const mockCollection = { id: 'col_1', title: 'Summer Collection', handle: 'summer' };
      mockProductService.getCollection.mockResolvedValue(mockCollection as any);

      const result = await productResolvers.Query.collection({}, {}, 'col_1', mockContext);
      expect(mockProductService.getCollection).toHaveBeenCalledWith('col_1', {});
      expect(result).toEqual(mockCollection);
    });

    it('should handle errors', async () => {
      const error = new Error('Collection not found');
      mockProductService.getCollection.mockRejectedValue(error);

      await expect(
        productResolvers.Query.collection({}, {}, 'invalid', mockContext)
      ).rejects.toThrow('Collection not found');
    });
  });
});

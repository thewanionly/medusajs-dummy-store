import { productResolvers } from '@graphql/resolvers/product';
import { GraphQLContext } from '@graphql/types/context';
import Medusa from '@medusajs/js-sdk';
import { mockMedusa } from '@mocks/medusa';
import { createMockProduct, createMockProducts } from '@mocks/products';
import { CategoryService } from '@services/medusa/category';
import { CollectionService } from '@services/medusa/collection';
import { ProductService } from '@services/medusa/product';

describe('Product Resolvers', () => {
  let mockProductService: jest.Mocked<ProductService>;
  let mockCategoryService: jest.Mocked<CategoryService>;
  let mockCollectionService: jest.Mocked<CollectionService>;
  let mockContext: GraphQLContext;

  beforeEach(() => {
    mockProductService = {
      getProducts: jest.fn(),
      getProduct: jest.fn(),
    } as unknown as jest.Mocked<ProductService>;

    mockCategoryService = {
      getCategories: jest.fn(),
      getCategory: jest.fn(),
    } as unknown as jest.Mocked<CategoryService>;

    mockCollectionService = {
      getCollections: jest.fn(),
      getCollection: jest.fn(),
    } as unknown as jest.Mocked<CollectionService>;

    mockContext = {
      medusa: mockMedusa as unknown as Medusa,
      productService: mockProductService,
      categoryService: mockCategoryService,
      collectionService: mockCollectionService,
    } as unknown as GraphQLContext;
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
      mockProductService.getProducts.mockResolvedValue(mockResponse);

      let result = await productResolvers.Query.products(
        {},
        { limit: 20, offset: 0 },
        mockContext
      );

      expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
      expect(mockProductService.getProducts).toHaveBeenCalledWith({
        limit: 20,
        offset: 0,
      });
      expect(result).toEqual(mockResponse);
      expect(result.products).toHaveLength(3);

      const emptyResponse = {
        products: [],
        count: 0,
        limit: 20,
        offset: 0,
      };
      mockProductService.getProducts.mockResolvedValue(emptyResponse);
      result = await productResolvers.Query.products(
        {},
        { limit: 20, offset: 0 },
        mockContext
      );
      expect(result).toEqual(emptyResponse);

      const originalProducts = JSON.parse(JSON.stringify(mockResponse));
      mockProductService.getProducts.mockResolvedValue(mockResponse);
      result = await productResolvers.Query.products(
        {},
        { limit: 20, offset: 0 },
        mockContext
      );
      expect(result).toEqual(originalProducts);

      const largeProductSet = createMockProducts(1000);
      const largeResponse = {
        products: largeProductSet,
        count: 1000,
        limit: 20,
        offset: 0,
      };
      mockProductService.getProducts.mockResolvedValue(largeResponse);
      result = await productResolvers.Query.products(
        {},
        { limit: 20, offset: 0 },
        mockContext
      );
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
          productResolvers.Query.products(
            {},
            { limit: 20, offset: 0 },
            mockContext
          )
        ).rejects.toThrow(errorMessage);

        expect(mockProductService.getProducts).toHaveBeenCalledTimes(1);
        jest.clearAllMocks();
      }
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
        { id: 'prod_123' },
        mockContext
      );

      expect(mockProductService.getProduct).toHaveBeenCalledWith('prod_123', {
        id: 'prod_123',
      });
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
          {
            id: 'tag_1',
          },
          {
            id: 'tag_2',
          },
        ],
        images: [
          {
            id: 'img_1',
            url: 'image1.jpg',
          },
          {
            id: 'img_2',
            url: 'image2.jpg',
          },
        ],
      });

      mockProductService.getProduct.mockResolvedValue(complexMockProduct);
      result = await productResolvers.Query.product(
        {},
        { id: 'prod_complex' },
        mockContext
      );

      expect(result).toEqual(complexMockProduct);
      expect(result?.weight).toBe(250);
      expect(result?.material).toBe('Organic Cotton');
      expect(result?.tags).toEqual([
        {
          id: 'tag_1',
        },
        {
          id: 'tag_2',
        },
      ]);

      mockProductService.getProduct.mockResolvedValue(null);
      result = await productResolvers.Query.product(
        {},
        { id: 'nonexistent' },
        mockContext
      );
      expect(result).toBeNull();
    });
  });
});

import { SearchClient, algoliasearch } from 'algoliasearch';

import {
  createMockAlgoliaHit,
  createMockAlgoliaHits,
  createMockAlgoliaResponse,
} from '@mocks/search';
import { AlgoliaSearchService } from '@services/algolia/search';

jest.mock('algoliasearch', () => {
  const mockSearchSingleIndex = jest.fn();
  const mockClient: Partial<SearchClient> = {
    searchSingleIndex: mockSearchSingleIndex,
  };

  return {
    __esModule: true,
    algoliasearch: jest.fn(() => mockClient),
    default: jest.fn(() => mockClient),
  };
});

describe('AlgoliaSearchService', () => {
  let searchService: AlgoliaSearchService;
  let consoleSpy: jest.SpyInstance;
  let mockSearchSingleIndex: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    process.env.ALGOLIA_APP_ID = 'test-app-id';
    process.env.ALGOLIA_API_KEY = 'test-api-key';
    process.env.ALGOLIA_PRODUCT_INDEX_NAME = 'products';

    mockSearchSingleIndex = jest.fn();

    (algoliasearch as unknown as jest.Mock).mockReturnValue({
      searchSingleIndex: mockSearchSingleIndex,
    });

    searchService = new AlgoliaSearchService();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('constructor', () => {
    it('should initialize correctly with valid credentials', () => {
      expect(searchService).toBeInstanceOf(AlgoliaSearchService);
    });

    it('should throw error when missing credentials', () => {
      delete process.env.ALGOLIA_APP_ID;
      delete process.env.ALGOLIA_API_KEY;

      expect(() => new AlgoliaSearchService()).toThrow(
        'Missing Algolia credentials. Set ALGOLIA_APP_ID and ALGOLIA_API_KEY'
      );
    });

    it('should throw error when missing app ID', () => {
      delete process.env.ALGOLIA_APP_ID;

      expect(() => new AlgoliaSearchService()).toThrow(
        'Missing Algolia credentials. Set ALGOLIA_APP_ID and ALGOLIA_API_KEY'
      );
    });

    it('should throw error when missing API key', () => {
      delete process.env.ALGOLIA_API_KEY;

      expect(() => new AlgoliaSearchService()).toThrow(
        'Missing Algolia credentials. Set ALGOLIA_APP_ID and ALGOLIA_API_KEY'
      );
    });
  });

  describe('search', () => {
    it('should handle successful search response', async () => {
      const mockHits = createMockAlgoliaHits(5);

      mockSearchSingleIndex.mockResolvedValue(
        createMockAlgoliaResponse(mockHits)
      );

      const result = await searchService.search({
        query: 'test',
        indexName: 'products',
        hitsPerPage: 20,
        page: 0,
      });

      expect(result.items).toHaveLength(5);
      expect(result.items).toEqual(mockHits);
      expect(result.total).toBe(5);
      expect(result.page).toBe(0);
      expect(result.totalPages).toBe(1);
      expect(result.hitsPerPage).toBe(20);
    });

    it('should handle empty search response', async () => {
      mockSearchSingleIndex.mockResolvedValue(
        createMockAlgoliaResponse([], { nbPages: 0 })
      );

      const result = await searchService.search({
        query: 'nonexistent',
        indexName: 'products',
        hitsPerPage: 20,
        page: 0,
      });

      expect(result.items).toEqual([]);
      expect(result.total).toBe(0);
      expect(result.totalPages).toBe(0);
    });

    it('should handle search with default parameters', async () => {
      mockSearchSingleIndex.mockResolvedValue(
        createMockAlgoliaResponse(createMockAlgoliaHits(5))
      );

      const result = await searchService.search({
        query: 'test',
      });

      expect(result.items).toHaveLength(5);
      expect(result.hitsPerPage).toBe(20);
      expect(result.page).toBe(0);
    });

    it('should handle search with custom parameters', async () => {
      mockSearchSingleIndex.mockResolvedValue(
        createMockAlgoliaResponse(createMockAlgoliaHits(5), {
          hitsPerPage: 10,
          page: 1,
        })
      );

      const result = await searchService.search({
        query: 'test',
        indexName: 'custom-index',
        hitsPerPage: 10,
        page: 1,
      });

      expect(result.items).toHaveLength(5);
      expect(result.hitsPerPage).toBe(10);
      expect(result.page).toBe(1);
    });

    it('should throw errors for different scenarios', async () => {
      const errorScenarios = [
        {
          name: 'Network timeout',
          error: new Error('Network timeout'),
        },
        {
          name: 'Internal server error',
          error: new Error('Internal server error'),
        },
        {
          name: 'Rate limit exceeded',
          error: new Error('Rate limit exceeded'),
        },
        {
          name: 'Unauthorized',
          error: new Error('Unauthorized'),
        },
        {
          name: 'Invalid credentials',
          error: new Error('Invalid credentials'),
        },
        {
          name: 'Search not found',
          error: new Error('Search not found'),
        },
      ];

      for (const scenario of errorScenarios) {
        mockSearchSingleIndex.mockRejectedValue(scenario.error);

        await expect(
          searchService.search({
            query: 'test',
            indexName: 'products',
          })
        ).rejects.toThrow(scenario.error.message);

        jest.clearAllMocks();
      }
    });

    it('should handle invalid data gracefully', async () => {
      mockSearchSingleIndex.mockResolvedValue(
        createMockAlgoliaResponse(createMockAlgoliaHits(4), { nbHits: 2 })
      );

      const result = await searchService.search({
        query: 'test',
        indexName: 'products',
      });

      expect(result.items).toHaveLength(4);
      expect(result.total).toBe(2);
    });

    it('should handle large datasets', async () => {
      mockSearchSingleIndex.mockResolvedValue(
        createMockAlgoliaResponse(createMockAlgoliaHits(1000), { nbPages: 50 })
      );

      const result = await searchService.search({
        query: 'test',
        indexName: 'products',
      });

      expect(result.items).toHaveLength(1000);
      expect(result.total).toBe(1000);
      expect(result.totalPages).toBe(50);
    });

    it('should handle empty query', async () => {
      mockSearchSingleIndex.mockResolvedValue(
        createMockAlgoliaResponse(createMockAlgoliaHits(5))
      );

      const result = await searchService.search({
        query: '',
        indexName: 'products',
      });

      expect(result.items).toHaveLength(5);
      expect(result.query).toBe('');
    });

    it('should handle null/undefined values in hits', async () => {
      mockSearchSingleIndex.mockResolvedValue(
        createMockAlgoliaResponse(
          [
            createMockAlgoliaHit({
              price: 0,
              title: null,
              description: undefined,
              thumbnail: null,
            }),
          ],
          { nbHits: 1 }
        )
      );

      const result = await searchService.search({
        query: 'test',
        indexName: 'products',
      });

      expect(result.items).toHaveLength(1);
      expect(result.items[0]).toEqual({
        id: 'prod_1',
        title: null,
        description: undefined,
        thumbnail: null,
        handle: 'test-product',
      });
    });
  });
});

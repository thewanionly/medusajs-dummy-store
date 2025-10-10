import { CollectionService } from '@services/medusa/collection';

import { mockMedusaApi } from '../../../__mocks__/products';

jest.mock('@medusajs/js-sdk', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => mockMedusaApi),
}));

describe('CollectionService', () => {
  let collectionService: CollectionService;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    collectionService = new CollectionService(
      'http://localhost:9000',
      'test-key'
    );
    (collectionService as any).medusa = mockMedusaApi;
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('getCollections', () => {
    it('should handle successful collection retrieval', async () => {
      const mockCollections = [
        { id: 'col_1', title: 'Summer Collection', handle: 'summer' },
        { id: 'col_2', title: 'Winter Collection', handle: 'winter' },
      ];
      mockMedusaApi.store.collection.list.mockResolvedValue({
        collections: mockCollections,
      });

      const result = await collectionService.getCollections();
      expect(result).toEqual(mockCollections);
      expect(mockMedusaApi.store.collection.list).toHaveBeenCalledWith(
        undefined
      );
    });

    it('should handle empty collection response', async () => {
      mockMedusaApi.store.collection.list.mockResolvedValue({
        collections: [],
      });

      const result = await collectionService.getCollections();
      expect(result).toEqual([]);
    });

    it('should throw error on failure', async () => {
      mockMedusaApi.store.collection.list.mockRejectedValue(
        new Error('Collection fetch failed')
      );
      await expect(collectionService.getCollections()).rejects.toThrow();
    });
  });

  describe('getCollection', () => {
    it('should handle successful single collection retrieval', async () => {
      const mockCollection = {
        id: 'col_1',
        title: 'Summer Collection',
        handle: 'summer',
      };
      mockMedusaApi.store.collection.retrieve.mockResolvedValue({
        collection: mockCollection,
      });

      const result = await collectionService.getCollection('col_1');
      expect(result).toEqual(mockCollection);
      expect(mockMedusaApi.store.collection.retrieve).toHaveBeenCalledWith(
        'col_1'
      );
    });

    it('should return null when collection not found', async () => {
      mockMedusaApi.store.collection.retrieve.mockResolvedValue({});
      const result = await collectionService.getCollection('nonexistent');
      expect(result).toBeNull();
    });

    it('should throw error on failure', async () => {
      mockMedusaApi.store.collection.retrieve.mockRejectedValue(
        new Error('Collection not found')
      );
      await expect(
        collectionService.getCollection('invalid')
      ).rejects.toThrow();
    });
  });
});

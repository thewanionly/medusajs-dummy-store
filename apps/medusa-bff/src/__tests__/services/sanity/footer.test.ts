import { mockFooterData } from '@mocks/data/footer';
import {
  authErrorHandler,
  emptyFooterHandler,
  generalErrorHandler,
  nullFooterHandler,
  queryErrorHandler,
  undefinedFooterHandler,
} from '@mocks/msw/handlers/sanity';
import { server } from '@mocks/msw/node';
import { SanityFooterService } from '@services/sanity/footer';

describe('SanityFooterService', () => {
  let sanityFooterService: SanityFooterService;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    sanityFooterService = new SanityFooterService();
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  describe('getFooterContent', () => {
    const mockQuery = '*[_type == "footer"][0]';

    it('should handle successful footer content retrieval', async () => {

      const result = await sanityFooterService.getFooterContent(mockQuery);

      expect(result).toEqual(mockFooterData);
      expect(result).toHaveLength(1);
      if (result && result.length > 0 && result[0]) {
        expect(result[0].storeName).toBe('Test Store');
        expect(result[0].social).toHaveLength(2);
      }
    });

    it('should handle empty footer content from Sanity', async () => {
      server.use(emptyFooterHandler);

      const result = await sanityFooterService.getFooterContent(mockQuery);

      expect(result).toEqual([]);
    });

    it('should handle null response from Sanity', async () => {
      server.use(nullFooterHandler);

      const result = await sanityFooterService.getFooterContent(mockQuery);

      expect(result).toBeNull();
    });

    it('should handle undefined response from Sanity', async () => {
      server.use(undefinedFooterHandler);

      const result = await sanityFooterService.getFooterContent(mockQuery);

      expect(result).toBeUndefined();
    });

    it('should handle Sanity client errors and return empty array', async () => {
      server.use(generalErrorHandler);

      const result = await sanityFooterService.getFooterContent(mockQuery);

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching footer content from Sanity:',
        expect.any(Error)
      );
    });

    it('should handle authentication errors', async () => {
      server.use(authErrorHandler);

      const result = await sanityFooterService.getFooterContent(mockQuery);

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching footer content from Sanity:',
        expect.any(Error)
      );
    });

    it('should handle malformed query errors', async () => {
      server.use(queryErrorHandler);

      const result =
        await sanityFooterService.getFooterContent('invalid-query');

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching footer content from Sanity:',
        expect.any(Error)
      );
    });

    it('should handle data integrity through JSON serialization', async () => {

      const result = await sanityFooterService.getFooterContent(mockQuery);

      // Ensure data integrity through JSON serialization
      const serialized = JSON.parse(JSON.stringify(result));
      expect(serialized).toEqual(mockFooterData);
    });

    it('should handle multiple calls without caching', async () => {

      // Make multiple calls
      const result1 = await sanityFooterService.getFooterContent(mockQuery);
      const result2 = await sanityFooterService.getFooterContent(mockQuery);
      const result3 = await sanityFooterService.getFooterContent(mockQuery);

      expect(result1).toEqual(mockFooterData);
      expect(result2).toEqual(mockFooterData);
      expect(result3).toEqual(mockFooterData);
    });

    it('should handle concurrent requests', async () => {

      const promises = Array.from({ length: 5 }, () =>
        sanityFooterService.getFooterContent(mockQuery)
      );
      const results = await Promise.all(promises);

      results.forEach((result) => {
        expect(result).toEqual(mockFooterData);
      });
    });
  });
});

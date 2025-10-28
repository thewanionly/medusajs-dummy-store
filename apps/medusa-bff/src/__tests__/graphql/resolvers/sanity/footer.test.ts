import { footerResolvers } from '@graphql/resolvers/sanity/footer';
import { mockFooterData } from '@mocks/data/footer';
import {
  emptyFooterHandler,
  generalErrorHandler,
  nullFooterHandler,
} from '@mocks/msw/handlers/sanity';
import { server } from '@mocks/msw/node';
import { createClient } from '@sanity/client';

describe('Footer Resolvers', () => {
  let mockContext: any;

  beforeEach(() => {
    const mockSanityClient = createClient({
      projectId: 'projectid',
      dataset: 'dev',
      apiVersion: '2023-05-03',
      useCdn: false,
    });

    mockContext = {
      sanityClient: mockSanityClient,
    };
  });

  describe('Query.footer', () => {
    it('should handle successful footer content retrieval', async () => {
      const result = await footerResolvers.Query.footer({}, {}, mockContext);

      expect(result).toEqual(mockFooterData);
      expect(result).toHaveLength(1);
      if (result && result.length > 0 && result[0]) {
        expect(result[0].storeName).toBe('Test Store');
        expect(result[0].social).toHaveLength(2);
      }
    });

    it('should handle empty footer content', async () => {
      server.use(emptyFooterHandler);

      const result = await footerResolvers.Query.footer({}, {}, mockContext);

      expect(result).toEqual([]);
    });

    it('should handle null footer content', async () => {
      server.use(nullFooterHandler);

      const result = await footerResolvers.Query.footer({}, {}, mockContext);

      expect(result).toBeNull();
    });

    it('should handle service errors properly', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      server.use(generalErrorHandler);

      const result = await footerResolvers.Query.footer({}, {}, mockContext);

      expect(result).toEqual([]);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error fetching footer content from Sanity:',
        expect.any(Error)
      );

      consoleSpy.mockRestore();
    });

    it('should handle data integrity with JSON serialization', async () => {
      const result = await footerResolvers.Query.footer({}, {}, mockContext);

      const serialized = JSON.parse(JSON.stringify(result));
      expect(serialized).toEqual(mockFooterData);
    });
  });
});

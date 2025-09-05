import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';

export interface CollectionListParams {
  limit?: number;
  offset?: number;
  handle?: string[];
  fields?: string;
}

export class CollectionService extends MedusaBaseService {
  async getCollections(
    params: CollectionListParams = {}
  ): Promise<HttpTypes.StoreCollection[]> {
    try {
      const { limit = 20, offset = 0, handle, fields = '*products' } = params;

      const queryParams: any = {
        limit,
        offset,
        fields,
      };

      if (handle && handle.length > 0) {
        queryParams.handle = handle;
      }

      const response = await this.medusa.store.collection.list(queryParams);
      return response.collections || [];
    } catch (error: unknown) {
      console.error('Error fetching collections:', (error as Error).message);
      return [];
    }
  }

  async getCollection(
    id?: string,
    handle?: string,
    fields?: string
  ): Promise<HttpTypes.StoreCollection | null> {
    try {
      const queryFields = fields || '*products';

      if (id) {
        const response = await this.medusa.store.collection.retrieve(id, {
          fields: queryFields,
        });
        return response.collection ?? null;
      } else if (handle) {
        // Search by handle
        const collections = await this.getCollections({
          handle: [handle],
          fields: queryFields,
          limit: 1,
        });
        return collections.length > 0 ? (collections[0] ?? null) : null;
      } else {
        throw new Error('Either id or handle must be provided');
      }
    } catch (error: unknown) {
      console.error('Error fetching collection:', (error as Error).message);
      return null;
    }
  }
}

import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';

export class CollectionService extends MedusaBaseService {
  async getCollections(
    params: HttpTypes.StoreCollectionFilters
  ): Promise<HttpTypes.StoreCollection[]> {
    try {
      const response = await this.medusa.store.collection.list(params);
      return response.collections || [];
    } catch (error: unknown) {
      console.error('Error fetching collections:', (error as Error).message);
      return [];
    }
  }

  async getCollection(
    id: string,
    params?: HttpTypes.StoreCollectionFilters
  ): Promise<HttpTypes.StoreCollection | null> {
    try {
      const response = await this.medusa.store.collection.retrieve(id, params);
      return response.collection ?? null;
    } catch (error: unknown) {
      console.error('Error fetching collection:', (error as Error).message);
      return null;
    }
  }
}

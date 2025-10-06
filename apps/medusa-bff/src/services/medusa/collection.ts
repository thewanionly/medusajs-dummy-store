import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';
import { handleMedusaError } from '../../lib/error-utils';

export class CollectionService extends MedusaBaseService {
  async getCollections(
    params?: HttpTypes.FindParams & HttpTypes.StoreCollectionFilters
  ): Promise<HttpTypes.StoreCollection[]> {
    try {
      const response = await this.medusa.store.collection.list(params);
      return response?.collections;
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch collections', ['collections']);
    }
  }

  async getCollection(
    id: string,
    params: HttpTypes.SelectParams
  ): Promise<HttpTypes.StoreCollection | null> {
    try {
      const response = await this.medusa.store.collection.retrieve(id, params);
      return response.collection || null;
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch collection', ['collection']);
    }
  }
}

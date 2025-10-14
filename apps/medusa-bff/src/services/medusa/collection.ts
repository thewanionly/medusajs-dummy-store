import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';
import { handleMedusaError } from '../../lib/error-utils';
import { Collection } from '../../types/products';

export class CollectionService extends MedusaBaseService {
  async getCollections(
    params?: HttpTypes.FindParams & HttpTypes.StoreCollectionFilters
  ): Promise<Collection[]> {
    try {
      const { collections } = await this.medusa.store.collection.list({
        ...params,
        fields: 'id,title,handle',
      });

      return collections?.map(({ id, title, handle }) => ({
        id,
        title,
        handle,
      }));
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch collections', ['collections']);
    }
  }

  async getCollection(id: string): Promise<Collection | null> {
    try {
      const { collection } = await this.medusa.store.collection.retrieve(id, {
        fields: 'id,title,handle',
      });
      if (!collection) return null;

      const { id: collectionId, title, handle } = collection;

      return { id: collectionId, title, handle };
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch collection', ['collection']);
    }
  }
}

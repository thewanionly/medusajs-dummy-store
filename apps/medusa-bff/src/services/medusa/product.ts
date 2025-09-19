import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';
import { handleMedusaError } from '../../lib/error-utils';

export class ProductService extends MedusaBaseService {
  async getProducts(
    params?: HttpTypes.StoreProductListParams
  ): Promise<HttpTypes.StoreProductListResponse> {
    try {
      const response = await this.medusa.store.product.list(params);
      return response;
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch products', ['products']);
    }
  }

  async getProduct(
    id: string,
    params?: HttpTypes.StoreProductParams
  ): Promise<HttpTypes.StoreProduct | null> {
    try {
      const response = await this.medusa.store.product.retrieve(id, params);
      return response?.product || null;
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch product', ['product']);
    }
  }

  async getProductCategories(
    params?: HttpTypes.StoreProductCategoryParams
  ): Promise<HttpTypes.StoreProductCategory[] | []> {
    try {
      const response = await this.medusa.store.category.list(params);
      return response?.product_categories || [];
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch product categories', [
        'productCategories',
      ]);
    }
  }

  async getProductCategory(
    id: string,
    params?: HttpTypes.StoreProductCategoryParams
  ): Promise<HttpTypes.StoreProductCategory | null> {
    try {
      const response = await this.medusa.store.category.retrieve(id, params);
      return response?.product_category || null;
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch product category', ['productCategory']);
    }
  }

  async getCollections(
    params?: HttpTypes.StoreCollectionFilters
  ): Promise<HttpTypes.StoreCollection[] | []> {
    try {
      const response = await this.medusa.store.collection.list(params);
      return response?.collections || [];
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch collections', ['collections']);
    }
  }

  async getCollection(
    id: string,
    params?: HttpTypes.StoreCollectionFilters
  ): Promise<HttpTypes.StoreCollection | null> {
    try {
      const response = await this.medusa.store.collection.retrieve(id, params);
      return response.collection || null;
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch collection', ['collection']);
    }
  }
}

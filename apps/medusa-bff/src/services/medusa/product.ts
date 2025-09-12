import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';

export class ProductService extends MedusaBaseService {
  async getProducts(
    params?: HttpTypes.StoreProductListParams & { region_id?: string; fields?: string }
  ): Promise<HttpTypes.StoreProductListResponse> {
    try {
      const { region_id, fields, ...medusaParams } = params || {};
      
      const queryParams: HttpTypes.StoreProductListParams = {
        ...medusaParams,
        ...(region_id && { region_id }),
        ...(fields && { fields }),
      };

      const response = await this.medusa.store.product.list(queryParams);
      return response;
    } catch (error: unknown) {
      console.error('Error fetching products:', (error as Error).message);
      return {
        products: [],
        count: 0,
        limit: params?.limit ?? 0,
        offset: params?.offset ?? 0,
      };
    }
  }

  async getProduct(
    id: string,
    params?: HttpTypes.StoreProductParams & { region_id?: string; fields?: string }
  ): Promise<HttpTypes.StoreProduct | null> {
    try {
      const { region_id, fields, ...medusaParams } = params || {};
      
      const queryParams: HttpTypes.StoreProductParams = {
        ...medusaParams,
        ...(region_id && { region_id }),
        ...(fields && { fields }),
      };

      const response = await this.medusa.store.product.retrieve(id, queryParams);
      return response?.product || null;
    } catch (error: unknown) {
      console.error('Error fetching product:', (error as Error).message);
      return null;
    }
  }

  async getProductCategories(
    params?: HttpTypes.StoreProductCategoryParams
  ): Promise<HttpTypes.StoreProductCategory[] | []> {
    try {
      const response = await this.medusa.store.category.list(params);
      return response?.product_categories || [];
    } catch (error: unknown) {
      console.error(
        'Error fetching product categories:',
        (error as Error).message
      );
      return [];
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
      console.error(
        'Error fetching product category:',
        (error as Error).message
      );
      return null;
    }
  }

  async getCollections(
    params?: HttpTypes.StoreCollectionFilters
  ): Promise<HttpTypes.StoreCollection[] | []> {
    try {
      const response = await this.medusa.store.collection.list(params);
      return response?.collections || [];
    } catch (error: unknown) {
      console.error('Error fetching collections:', (error as Error).message);
      return [];
    }
  }

  async getCollection(
    id: string,
    params?: HttpTypes.SelectParams
  ): Promise<HttpTypes.StoreCollection | null> {
    try {
      const response = await this.medusa.store.collection.retrieve(id, params);
      return response.collection || null;
    } catch (error: unknown) {
      console.error('Error fetching collection:', (error as Error).message);
      return null;
    }
  }
}

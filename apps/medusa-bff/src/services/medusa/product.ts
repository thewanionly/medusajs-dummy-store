import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';

export interface ProductListResponse {
  products: HttpTypes.StoreProduct[];
  count: number;
  limit?: number;
  offset?: number;
}

export interface ProductListParams {
  limit?: number;
  offset?: number;
  [key: string]: unknown;
}

export interface ProductRetrieveParams {
  fields?: string;
  [key: string]: unknown;
}

export class ProductService extends MedusaBaseService {
  async getProducts(params?: ProductListParams): Promise<ProductListResponse> {
    try {
      const response = await this.medusa.store.product.list(params);
      return {
        products: response?.products || [],
        count: response?.count || 0,
        limit: response?.limit,
        offset: response?.offset,
      };
    } catch (error: unknown) {
      console.error('Error fetching products:', (error as Error).message);
      return {
        products: [],
        count: 0,
      };
    }
  }

  async getProduct(
    id: string,
    params?: ProductRetrieveParams
  ): Promise<HttpTypes.StoreProduct | null> {
    try {
      const queryParams = {
        ...params,
      };
      const response = await this.medusa.store.product.retrieve(
        id,
        queryParams
      );
      return response?.product || null;
    } catch (error: unknown) {
      console.error('Error fetching product:', (error as Error).message);
      return null;
    }
  }
}

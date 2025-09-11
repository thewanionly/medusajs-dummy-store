import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';

export class ProductService extends MedusaBaseService {
  async getProducts(
    params?: HttpTypes.StoreProductListParams
  ): Promise<HttpTypes.StoreProductListResponse> {
    try {
      const response = await this.medusa.store.product.list(params);
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
    params?: HttpTypes.StoreProductParams
  ): Promise<HttpTypes.StoreProduct | null> {
    try {
      const response = await this.medusa.store.product.retrieve(id, params);
      return response?.product || null;
    } catch (error: unknown) {
      console.error('Error fetching product:', (error as Error).message);
      return null;
    }
  }
}

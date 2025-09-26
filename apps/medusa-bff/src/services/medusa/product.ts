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
}

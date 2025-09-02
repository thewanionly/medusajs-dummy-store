import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';

export class ProductService extends MedusaBaseService {
  async getProducts(): Promise<HttpTypes.StoreProduct[]> {
    try {
      const response = await this.medusa.store.product.list();
      return response.products || [];
    } catch (error: unknown) {
      console.error('Error fetching products:', (error as Error).message);
      return [];
    }
  }

  async getProduct(id: string): Promise<HttpTypes.StoreProduct | null> {
    try {
      const response = await this.medusa.store.product.retrieve(id);
      return response.product || null;
    } catch (error: unknown) {
      console.error('Error fetching product:', (error as Error).message);
      return null;
    }
  }
}

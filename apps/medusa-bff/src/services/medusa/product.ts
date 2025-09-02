import Medusa from '@medusajs/js-sdk';
import type { HttpTypes } from '@medusajs/types';

export class ProductService {
  private medusa: Medusa;

  constructor(baseURL: string, publishableKey?: string) {
    this.medusa = new Medusa({
      baseUrl: baseURL,
      publishableKey,
    });
  }

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

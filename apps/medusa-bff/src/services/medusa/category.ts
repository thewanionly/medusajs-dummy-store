import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';

export class CategoryService extends MedusaBaseService {
  async getCategories(
    params: HttpTypes.StoreProductCategoryParams = {}
  ): Promise<HttpTypes.StoreProductCategory[]> {
    try {
      const response = await this.medusa.store.category.list(params);
      return response.product_categories || [];
    } catch (error: unknown) {
      console.error('Error fetching categories:', (error as Error).message);
      return [];
    }
  }

  async getCategory(
    id: string,
    params: HttpTypes.StoreProductCategoryParams = {}
  ): Promise<HttpTypes.StoreProductCategory | null> {
    try {
      const response = await this.medusa.store.category.retrieve(id, params);
      return response.product_category ?? null;
    } catch (error: unknown) {
      console.error('Error fetching category:', (error as Error).message);
      return null;
    }
  }
}

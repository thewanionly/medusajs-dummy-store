import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';
import { handleMedusaError } from '../../lib/error-utils';

export class CategoryService extends MedusaBaseService {
  async getCategories(
    params: HttpTypes.FindParams & HttpTypes.StoreProductCategoryListParams
  ): Promise<HttpTypes.StoreProductCategory[]> {
    try {
      const response = await this.medusa.store.category.list(params);
      return response.product_categories || [];
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch categories', ['categories']);
    }
  }

  async getCategory(
    id: string,
    params: HttpTypes.StoreProductCategoryParams
  ): Promise<HttpTypes.StoreProductCategory | null> {
    try {
      const response = await this.medusa.store.category.retrieve(id, params);
      return response.product_category ?? null;
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch category', ['category']);
    }
  }
}

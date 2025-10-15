import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';
import { CATEGORY_FIELDS } from '../../constants/medusa';
import { handleMedusaError } from '../../lib/error-utils';
import { ProductCategory } from '../../types/products';

export class CategoryService extends MedusaBaseService {
  async getCategories(
    params: HttpTypes.FindParams & HttpTypes.StoreProductCategoryListParams
  ): Promise<ProductCategory[]> {
    try {
      const response = await this.medusa.store.category.list({
        ...params,
        fields: CATEGORY_FIELDS,
      });

      return (
        response.product_categories?.map(
          ({
            id,
            description,
            name,
            handle,
            parent_category: parentCategory,
            category_children: categoryChildren,
          }) => ({
            id,
            description,
            name,
            handle,
            parentCategory,
            categoryChildren,
          })
        ) || []
      );
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch categories', ['categories']);
    }
  }

  async getCategory(id: string): Promise<ProductCategory | null> {
    try {
      const response = await this.medusa.store.category.retrieve(id, {
        fields: CATEGORY_FIELDS,
      });

      const {
        id: categoryId,
        description,
        name,
        handle,
        parent_category: parentCategory,
        category_children: categoryChildren,
      } = response.product_category;

      return response.product_category
        ? {
            id: categoryId,
            description,
            name,
            handle,
            parentCategory,
            categoryChildren,
          }
        : null;
    } catch (error: unknown) {
      handleMedusaError(error, 'fetch category', ['category']);
    }
  }
}

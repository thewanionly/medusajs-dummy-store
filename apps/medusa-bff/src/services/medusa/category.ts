import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';

export interface CategoryListParams {
  limit?: number;
  offset?: number;
  q?: string;
  handle?: string;
  is_active?: boolean;
  is_internal?: boolean;
  include_descendants_tree?: boolean;
  parent_category_id?: string;
  fields?: string;
}

export class CategoryService extends MedusaBaseService {
  async getCategories(
    params: CategoryListParams = {}
  ): Promise<HttpTypes.StoreProductCategory[]> {
    try {
      const {
        limit = 20,
        offset = 0,
        q,
        handle,
        is_active,
        is_internal,
        include_descendants_tree = false,
        parent_category_id,
        fields = '*category_children, *products, *parent_category, *parent_category.parent_category',
      } = params;

      const queryParams: any = {
        limit,
        offset,
        fields,
      };

      if (q) queryParams.q = q;
      if (handle) queryParams.handle = handle;
      if (is_active !== undefined) queryParams.is_active = is_active;
      if (is_internal !== undefined) queryParams.is_internal = is_internal;
      if (include_descendants_tree)
        queryParams.include_descendants_tree = include_descendants_tree;
      if (parent_category_id)
        queryParams.parent_category_id = parent_category_id;

      const response = await this.medusa.store.category.list(queryParams);
      return response.product_categories || [];
    } catch (error: unknown) {
      console.error('Error fetching categories:', (error as Error).message);
      return [];
    }
  }

  async getCategory(
    id?: string,
    handle?: string,
    fields?: string
  ): Promise<HttpTypes.StoreProductCategory | null> {
    try {
      const queryFields =
        fields ||
        '*category_children, *products, *parent_category, *parent_category.parent_category';

      if (id) {
        const response = await this.medusa.store.category.retrieve(id, {
          fields: queryFields,
        });
        return response.product_category ?? null;
      } else if (handle) {
        // Search by handle
        const categories = await this.getCategories({
          handle,
          fields: queryFields,
          limit: 1,
        });
        return categories.length > 0 ? (categories[0] ?? null) : null;
      } else {
        throw new Error('Either id or handle must be provided');
      }
    } catch (error: unknown) {
      console.error('Error fetching category:', (error as Error).message);
      return null;
    }
  }
}

import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';

export interface ProductFilters {
  q?: string;
  id?: string[];
  status?: string[];
  handle?: string[];
  is_giftcard?: boolean;
  category_id?: string[];
  collection_id?: string[];
  tag_id?: string[];
  type_id?: string[];
  variants?: {
    q?: string;
    id?: string[];
    sku?: string[];
    barcode?: string[];
    ean?: string[];
    upc?: string[];
    title?: string[];
    inventory_quantity?: {
      lt?: number;
      gt?: number;
      lte?: number;
      gte?: number;
    };
    allow_backorder?: boolean;
    manage_inventory?: boolean;
    created_at?: {
      lt?: string;
      gt?: string;
      lte?: string;
      gte?: string;
    };
    updated_at?: {
      lt?: string;
      gt?: string;
      lte?: string;
      gte?: string;
    };
  };
  created_at?: {
    lt?: string;
    gt?: string;
    lte?: string;
    gte?: string;
  };
  updated_at?: {
    lt?: string;
    gt?: string;
    lte?: string;
    gte?: string;
  };
}

export interface ProductListParams {
  limit?: number;
  offset?: number;
  filters?: ProductFilters;
  region_id?: string;
  fields?: string;
}

export interface ProductsResponse {
  products: HttpTypes.StoreProduct[];
  count: number;
  offset: number;
  limit: number;
}

export class ProductService extends MedusaBaseService {
  async getProducts(params: ProductListParams = {}): Promise<ProductsResponse> {
    try {
      const {
        limit = 20,
        offset = 0,
        filters = {},
        region_id,
        fields = '*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags',
      } = params;

      const queryParams: any = {
        limit,
        offset,
        fields,
        ...filters,
      };

      if (region_id) {
        queryParams.region_id = region_id;
      }

      const response = await this.medusa.store.product.list(queryParams);

      return {
        products: response.products || [],
        count: response.count || 0,
        offset: response.offset || 0,
        limit: response.limit || limit,
      };
    } catch (error: unknown) {
      console.error('Error fetching products:', (error as Error).message);
      return {
        products: [],
        count: 0,
        offset: 0,
        limit: params.limit || 20,
      };
    }
  }

  async getProduct(
    id: string,
    params: { region_id?: string; fields?: string } = {}
  ): Promise<HttpTypes.StoreProduct | null> {
    try {
      const {
        region_id,
        fields = '*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags',
      } = params;

      const queryParams: any = { fields };

      if (region_id) {
        queryParams.region_id = region_id;
      }

      const response = await this.medusa.store.product.retrieve(
        id,
        queryParams
      );
      return response.product || null;
    } catch (error: unknown) {
      console.error('Error fetching product:', (error as Error).message);
      return null;
    }
  }
}

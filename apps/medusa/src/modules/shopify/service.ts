import { MedusaError } from '@medusajs/framework/utils';

import {
  ShopifyPaginatedResponse,
  ShopifyPagination,
  ShopifyProduct,
} from './types';

type Options = {
  baseUrl: string;
};

export default class ShopifyModuleService {
  private options: Options;

  constructor({}, options: Options) {
    this.options = {
      ...options,
    };
  }

  async getProducts(options?: { page?: number; limit?: number }): Promise<{
    products: ShopifyProduct[];
    pagination: ShopifyPagination;
  }> {
    const { page = 1, limit = 100 } = options || {};

    const searchQuery = new URLSearchParams();
    if (page) {
      searchQuery.append('page', page.toString());
    }

    if (limit) {
      searchQuery.append('limit', limit.toString());
    }

    try {
      const response = await fetch(
        `${this.options.baseUrl}/products.json?${searchQuery}`
      );
      const { products }: ShopifyPaginatedResponse<ShopifyProduct> =
        await response.json();
      return { products, pagination: { page, limit } };
    } catch (err: any) {
      console.log(err);
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Failed to get products from Shopify: ${err.message}`
      );
    }
  }
}

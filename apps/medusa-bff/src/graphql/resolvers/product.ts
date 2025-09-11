import { HttpTypes } from '@medusajs/types';

import { GraphQLContext } from '../types/context';

export interface ProductsArgs {
  limit?: number;
  offset?: number;
}

export interface ProductArgs extends HttpTypes.StoreProductParams {
  id: string;
}

export const productResolvers = {
  Query: {
    products: async (
      _parent: unknown,
      args: ProductsArgs,
      context: GraphQLContext
    ) => {
      return await context.productService.getProducts(args);
    },
    product: async (
      _parent: unknown,
      { id, ...params }: ProductArgs,
      context: GraphQLContext
    ) => {
      return await context.productService.getProduct(id, params);
    },
  },
};

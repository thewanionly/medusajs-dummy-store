import { GraphQLContext } from '../types/context';

export interface ProductsArgs {
  limit?: number;
  offset?: number;
}

export interface ProductArgs {
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
      args: ProductArgs,
      context: GraphQLContext
    ) => {
      return await context.productService.getProduct(args.id);
    },
  },
};

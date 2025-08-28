import { GraphQLContext } from '../types/context';

export const productResolvers = {
  Query: {
    products: async (_parent: any, _args: any, context: GraphQLContext) => {
      return await context.medusaAPI.getProducts();
    },
    product: async (
      _parent: any,
      { id }: { id: string },
      context: GraphQLContext
    ) => {
      return await context.medusaAPI.getProduct(id);
    },
  },
};

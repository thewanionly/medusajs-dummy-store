import { GraphQLContext } from '../types/context';

export const productResolvers = {
  Query: {
    products: async (
      _parent: any,
      args: {
        limit?: number;
        offset?: number;
        filters?: any;
        region_id?: string;
        fields?: string;
      },
      context: GraphQLContext
    ) => {
      return await context.productService.getProducts(args);
    },

    product: async (
      _parent: any,
      args: {
        id: string;
        region_id?: string;
        fields?: string;
      },
      context: GraphQLContext
    ) => {
      const { id, region_id, fields } = args;
      return await context.productService.getProduct(id, { region_id, fields });
    },

    productCategories: async (
      _parent: any,
      args: {
        limit?: number;
        offset?: number;
        q?: string;
        handle?: string;
        is_active?: boolean;
        is_internal?: boolean;
        include_descendants_tree?: boolean;
        parent_category_id?: string;
        fields?: string;
      },
      context: GraphQLContext
    ) => {
      return await context.categoryService.getCategories(args);
    },

    productCategory: async (
      _parent: any,
      args: {
        id?: string;
        handle?: string;
        fields?: string;
      },
      context: GraphQLContext
    ) => {
      const { id, handle, fields } = args;
      return await context.categoryService.getCategory(id, handle, fields);
    },

    collections: async (
      _parent: any,
      args: {
        limit?: number;
        offset?: number;
        handle?: string[];
        fields?: string;
      },
      context: GraphQLContext
    ) => {
      return await context.collectionService.getCollections(args);
    },

    collection: async (
      _parent: any,
      args: {
        id?: string;
        handle?: string;
        fields?: string;
      },
      context: GraphQLContext
    ) => {
      const { id, handle, fields } = args;
      return await context.collectionService.getCollection(id, handle, fields);
    },
  },
};

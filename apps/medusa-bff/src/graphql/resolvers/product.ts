import { HttpTypes } from '@medusajs/types';

import { GraphQLContext } from '../types/context';

export interface ProductArgs extends HttpTypes.StoreProductParams {
  id: string;
  region_id?: string;
  fields?: string;
}

export interface CategoryArgs extends HttpTypes.StoreProductCategoryParams {
  id: string;
  region_id?: string;
  fields?: string;
}

export interface CollectionArgs extends HttpTypes.StoreCollectionFilters {
  id: string;
  region_id?: string;
  fields?: string;
}
export const productResolvers = {
  Query: {
    products: async (
      _parent: unknown,
      args: HttpTypes.StoreProductParams & { region_id?: string; fields?: string },
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
    productCategories: async (
      _parent: unknown,
      args: HttpTypes.StoreProductCategoryParams,
      context: GraphQLContext
    ) => {
      return await context.productService.getProductCategories(args);
    },
    productCategory: async (
      _parent: unknown,
      { id, ...params }: CategoryArgs,
      context: GraphQLContext
    ) => {
      return await context.productService.getProductCategory(id, params);
    },
    collections: async (
      _parent: unknown,
      args: HttpTypes.StoreCollectionFilters,
      context: GraphQLContext
    ) => {
      return await context.productService.getCollections(args);
    },
    collection: async (
      _parent: unknown,
      { id, ...params }: CollectionArgs,
      context: GraphQLContext
    ) => {
      return await context.productService.getCollection(id, params);
    },
  },
};

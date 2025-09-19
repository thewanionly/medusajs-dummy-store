import {
  HttpTypes,
  StoreCollectionFilters,
  StoreProductCategoryParams,
} from '@medusajs/types';

import { GraphQLContext } from '../types/context';

export const productResolvers = {
  Query: {
    products: async (
      _parent: unknown,
      args: HttpTypes.StoreProductParams,
      context: GraphQLContext
    ) => {
      return await context.productService.getProducts(args);
    },
    product: async (
      _parent: unknown,
      params: HttpTypes.StoreProductParams,
      id: string,
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
      params: StoreProductCategoryParams,
      id: string,
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
      params: StoreCollectionFilters,
      id: string,
      context: GraphQLContext
    ) => {
      return await context.productService.getCollection(id, params);
    },
  },
};

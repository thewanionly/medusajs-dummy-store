import type { HttpTypes } from '@medusajs/types';

import { GraphQLContext } from '../types/context';

export const cartResolvers = {
  Query: {
    getCart: async (
      _parent: any,
      { id }: { id: string },
      context: GraphQLContext
    ) => {
      return await context.cartService.getCart(id);
    },
  },
  Mutation: {
    createCart: async (
      _parent: any,
      { data }: { data: HttpTypes.StoreCreateCart },
      context: GraphQLContext
    ) => {
      return await context.cartService.createCart(data);
    },
    updateCart: async (
      _parent: any,
      { id, data }: { id: string; data: HttpTypes.StoreUpdateCart },
      context: GraphQLContext
    ) => {
      return await context.cartService.updateCart(id, data);
    },
    createLineItem: async (
      _parent: any,
      {
        cartId,
        data,
      }: { cartId: string; data: HttpTypes.StoreAddCartLineItem },
      context: GraphQLContext
    ) => {
      return await context.cartService.createLineItem(cartId, data);
    },
    updateLineItem: async (
      _parent: any,
      {
        cartId,
        lineItemId,
        data,
      }: {
        cartId: string;
        lineItemId: string;
        data: HttpTypes.StoreUpdateCartLineItem;
      },
      context: GraphQLContext
    ) => {
      return await context.cartService.updateLineItem(cartId, lineItemId, data);
    },
    deleteLineItem: async (
      _parent: any,
      { cartId, lineItemId }: { cartId: string; lineItemId: string },
      context: GraphQLContext
    ) => {
      return await context.cartService.deleteLineItem(cartId, lineItemId);
    },
    addShippingMethod: async (
      _parent: any,
      { cartId, optionId }: { cartId: string; optionId: string },
      context: GraphQLContext
    ) => {
      return await context.cartService.addShippingMethod(cartId, optionId);
    },
    completeCart: async (
      _parent: any,
      { cartId }: { cartId: string },
      context: GraphQLContext
    ) => {
      return await context.cartService.completeCart(cartId);
    },
  },
};

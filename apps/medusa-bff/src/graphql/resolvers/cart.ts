import type { HttpTypes } from '@medusajs/types';

import { GraphQLContext } from '../types/context';

export const cartResolvers = {
  Query: {
    getCart: async (
      _parent: unknown,
      { id }: { id: string },
      context: GraphQLContext
    ) => {
      return await context.cartService.getCart(id);
    },
  },
  Mutation: {
    createCart: async (
      _parent: unknown,
      { data }: { data: HttpTypes.StoreCreateCart },
      context: GraphQLContext
    ) => {
      return await context.cartService.createCart(data);
    },
    updateCart: async (
      _parent: unknown,
      { id, data }: { id: string; data: HttpTypes.StoreUpdateCart },
      context: GraphQLContext
    ) => {
      return await context.cartService.updateCart(id, data);
    },
    createLineItem: async (
      _parent: unknown,
      {
        cartId,
        data,
      }: { cartId: string; data: HttpTypes.StoreAddCartLineItem },
      context: GraphQLContext
    ) => {
      return await context.cartService.createLineItem(cartId, data);
    },
    updateLineItem: async (
      _parent: unknown,
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
      _parent: unknown,
      { cartId, lineItemId }: { cartId: string; lineItemId: string },
      context: GraphQLContext
    ) => {
      return await context.cartService.deleteLineItem(cartId, lineItemId);
    },
    addShippingMethod: async (
      _parent: unknown,
      { cartId, optionId }: { cartId: string; optionId: string },
      context: GraphQLContext
    ) => {
      return await context.cartService.addShippingMethod(cartId, optionId);
    },
    completeCart: async (
      _parent: unknown,
      { cartId }: { cartId: string },
      context: GraphQLContext
    ) => {
      return await context.cartService.completeCart(cartId);
    },
    transferCart: async (
      _parent: unknown,
      { cartId }: { cartId: string },
      context: GraphQLContext
    ) => {
      return await context.cartService.transferCart(cartId);
    },

    applyPromotions: async (
      _parent: unknown,
      { cartId, codes }: { cartId: string; codes: string[] },
      context: GraphQLContext
    ) => {
      return await context.cartService.applyPromotions(cartId, codes);
    },
  },
  CompleteCartResponse: {
    __resolveType(obj: HttpTypes.StoreCompleteCartResponse) {
      if (obj.type === 'order') {
        return 'CompleteCartOrderResult';
      }
      if (obj.type === 'cart') {
        return 'CompleteCartErrorResult';
      }
      return null;
    },
  },
};

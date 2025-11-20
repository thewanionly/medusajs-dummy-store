import { handleMedusaError } from '../../../lib/error-utils';

import type { Product } from '@graphql/generated/graphql';

import { GraphQLContext } from '@graphql/types/context';
import { UnauthorizedError } from '../../../types/errors';

import {
  transformWishlist,
  type WishlistApiResponse,
  hasCompleteProductData,
} from './util/transform';

const WISHLIST_FIELDS = [
  '*',
  'items.*',
  'items.product_variant.*',
  'items.product_variant.product.*',
  'items.product_variant.product.images.*',
  'items.product_variant.product.tags.*',
  'items.product_variant.product.collection.*',
  'items.product_variant.product.type.*',
  'items.product_variant.product.options.*',
  'items.product_variant.product.options.values.*',
  'items.product_variant.product.variants.*',
  'items.product_variant.product.variants.options.*',
] as const;

const wishlistFieldsQuery = `fields=${WISHLIST_FIELDS.join(',')}`;

export const wishlistResolvers = {
  Query: {
    wishlist: async (
      _: unknown,
      __: unknown,
      { medusa, session, productService }: GraphQLContext
    ) => {
      ensureCustomerIsLoggedIn(session, ['Query', 'wishlist']);

      try {
        const { wishlist } = (await medusa.client.fetch(
          `/store/customers/me/wishlists?${wishlistFieldsQuery}`
        )) as WishlistApiResponse;

        return buildWishlistResponse(wishlist, productService);
      } catch (e) {
        handleMedusaError(e, 'run Query.wishlist', ['Query', 'wishlist']);
      }
    },
  },
  Mutation: {
    addWishlistItem: async (
      _: unknown,
      args: { productVariantId: string },
      { medusa, session, productService }: GraphQLContext
    ) => {
      ensureCustomerIsLoggedIn(session, ['Mutation', 'addWishlistItem']);

      try {
        const { wishlist } = (await medusa.client.fetch(
          `/store/customers/me/wishlists/items?${wishlistFieldsQuery}`,
          {
            method: 'POST',
            body: { variant_id: args.productVariantId },
          }
        )) as WishlistApiResponse;

        return buildWishlistResponse(wishlist, productService);
      } catch (e) {
        handleMedusaError(e, 'run Mutation.addWishlistItem', [
          'Mutation',
          'addWishlistItem',
        ]);
      }
    },
    removeWishlistItem: async (
      _: unknown,
      args: { wishlistItemId: string },
      { medusa, session, productService }: GraphQLContext
    ) => {
      ensureCustomerIsLoggedIn(session, ['Mutation', 'removeWishlistItem']);

      try {
        const { wishlist } = (await medusa.client.fetch(
          `/store/customers/me/wishlists/items/${args.wishlistItemId}?${wishlistFieldsQuery}`,
          {
            method: 'DELETE',
          }
        )) as WishlistApiResponse;

        return buildWishlistResponse(wishlist, productService);
      } catch (e) {
        handleMedusaError(e, 'run Mutation.removeWishlistItem', [
          'Mutation',
          'removeWishlistItem',
        ]);
      }
    },
  },
};

const ensureCustomerIsLoggedIn = (
  session: GraphQLContext['session'],
  path: (string | number)[]
) => {
  if (!session.isCustomerLoggedIn) {
    throw new UnauthorizedError(path);
  }
};

const buildWishlistResponse = async (
  wishlist: WishlistApiResponse['wishlist'],
  productService: GraphQLContext['productService']
) => {
  const productsById = await loadMissingProducts(wishlist, productService);
  return transformWishlist(wishlist, { productsById });
};

async function loadMissingProducts(
  wishlist: WishlistApiResponse['wishlist'],
  productService: GraphQLContext['productService']
): Promise<Record<string, Product> | undefined> {
  const missingProductIds = new Set<string>();

  wishlist.items?.forEach((item) => {
    const productVariant = item?.product_variant;
    if (!productVariant?.product_id) {
      return;
    }

    if (!hasCompleteProductData(productVariant.product)) {
      missingProductIds.add(productVariant.product_id);
    }
  });

  if (!missingProductIds.size) {
    return undefined;
  }

  const response = await productService.getProducts({
    id: Array.from(missingProductIds),
  });

  const products = response?.products ?? [];

  if (!products?.length) {
    return undefined;
  }

  return products.reduce<Record<string, Product>>(
    (acc, product) => {
      if (product) {
        acc[product.id] = product;
      }
      return acc;
    },
    {}
  );
}

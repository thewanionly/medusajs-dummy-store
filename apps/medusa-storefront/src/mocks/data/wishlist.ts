import type { WishlistGraphQL, WishlistItemGraphQL } from '@lib/gql/mutations/wishlist';

import { mockedProducts } from './products';

const mockedWishlistId = 'wishlist_mock_id';
export const mockedProductVariantId =
  mockedProducts[0]?.variants?.[0]?.id || 'product_variant_mock_id';
export const mockedWishlistItemId = 'wishlist_item_mock_id';

const buildWishlistItemFromProduct = (
  productIndex: number,
  productIdFallback: string
): WishlistItemGraphQL | null => {
  const product = mockedProducts[productIndex];
  if (!product) {
    return null;
  }

  const variant = product.variants?.[0];
  if (!variant) {
    return null;
  }

  const itemId =
    productIndex === 0
      ? mockedWishlistItemId
      : `wishlist_item_mock_id_${productIndex + 1}`;

  return {
    __typename: 'WishlistItem',
    id: itemId,
    wishlistId: mockedWishlistId,
    productVariantId: variant.id ?? productIdFallback,
    productVariant: {
      ...variant,
      product: {
        __typename: 'Product',
        id: product.id || productIdFallback,
        title: product.title,
        handle: product.handle,
        thumbnail: product.thumbnail,
        images: product.images,
      },
    },
  } as WishlistItemGraphQL;
};

const wishlistItems: WishlistItemGraphQL[] = [0, 1, 2, 3]
  .map((index) => buildWishlistItemFromProduct(index, `wishlist_product_${index}`))
  .filter((item): item is WishlistItemGraphQL => item !== null);

const buildWishlist = (items: WishlistItemGraphQL[]): WishlistGraphQL => ({
  __typename: 'Wishlist',
  id: mockedWishlistId,
  items,
});

export const mockedWishlistWithItem: WishlistGraphQL = buildWishlist([
  wishlistItems[0]!,
]);

export const mockedWishlistWithMultipleItems: WishlistGraphQL =
  buildWishlist(wishlistItems);

export const mockedEmptyWishlist: WishlistGraphQL = buildWishlist([]);

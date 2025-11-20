import type { StoreWishlist } from '@graphql/resolvers/wishlist/util/transform';
import { HttpTypes } from '@medusajs/types';

import { createMockMedusaProduct } from '@mocks/products';

export const createMockWishlist = (
  overrides: Partial<StoreWishlist> = {}
): StoreWishlist => {
  const product = createMockMedusaProduct();
  const variant = Object.assign({}, product.variants[0], {
    product,
    calculated_price: {
      currency_code: 'usd',
      calculated_amount: 2500,
      original_amount: 3000,
      calculated_price: {
        price_list_type: 'default',
      },
      original_price: {
        price_list_type: 'default',
      },
    },
  }) as unknown as HttpTypes.StoreProductVariant;

  const defaultWishlist: StoreWishlist = {
    id: 'wishlist_1',
    items: [
      {
        id: 'wishlist_item_1',
        wishlist_id: 'wishlist_1',
        product_variant_id: variant.id,
        product_variant: variant,
      },
    ],
  };

  return {
    ...defaultWishlist,
    ...overrides,
    items: overrides.items ?? defaultWishlist.items,
  };
};

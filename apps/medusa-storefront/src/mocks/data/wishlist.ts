import type { WishlistGraphQL } from '@lib/gql/mutations/wishlist';

const mockedWishlistId = 'wishlist_mock_id';
export const mockedWishlistItemId = 'wishlist_item_mock_id';
const mockedProductVariantId = 'product_variant_mock_id';

export const mockedWishlistWithItem: WishlistGraphQL = {
  id: mockedWishlistId,
  items: [
    {
      id: mockedWishlistItemId,
      wishlistId: mockedWishlistId,
      productVariantId: mockedProductVariantId,
      productVariant: {
        __typename: 'ProductVariant',
        id: mockedProductVariantId,
        sku: 'SKU-WISHLIST-1',
        inventoryQuantity: 25,
        allowBackorder: false,
        manageInventory: true,
        options: [
          {
            __typename: 'ProductVariantOption',
            id: 'variant_option_static',
            optionId: 'option_size',
            value: 'M',
          },
        ],
        price: {
          __typename: 'Price',
          amount: 135,
          currencyCode: 'eur',
          priceType: 'default',
        },
        originalPrice: {
          __typename: 'Price',
          amount: 135,
          currencyCode: 'eur',
          priceType: 'default',
        },
      },
    },
  ],
};

export const mockedEmptyWishlist: WishlistGraphQL = {
  id: mockedWishlistId,
  items: [],
};

import { HttpResponse, http } from 'msw';

import { createMockWishlist } from '@mocks/wishlist';

const wishlistUrl = `${process.env.MEDUSA_API_URL}/store/customers/me/wishlists`;
const wishlistItemsUrl = `${wishlistUrl}/items`;

export const createWishlistHandler = (
  wishlist = createMockWishlist()
) =>
  http.get(wishlistUrl, () =>
    HttpResponse.json({
      wishlist,
    })
  );

export const wishlistErrorHandler = http.get(wishlistUrl, () =>
  HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 })
);

export const createAddWishlistItemHandler = (
  wishlist = createMockWishlist()
) =>
  http.post(wishlistItemsUrl, async () =>
    HttpResponse.json({
      wishlist,
    })
  );

export const addWishlistItemErrorHandler = http.post(
  wishlistItemsUrl,
  () => HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 })
);

export const createRemoveWishlistItemHandler = (
  wishlist = createMockWishlist()
) =>
  http.delete(`${wishlistItemsUrl}/:id`, async () =>
    HttpResponse.json({
      wishlist,
    })
  );

export const removeWishlistItemErrorHandler = http.delete(
  `${wishlistItemsUrl}/:id`,
  () => HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 })
);

export const handlers = [
  createWishlistHandler(),
  createAddWishlistItemHandler(),
  createRemoveWishlistItemHandler(),
];

import { HttpResponse, http } from 'msw';

import { createMockWishlist } from '@mocks/wishlist';

const wishlistUrl = `${process.env.MEDUSA_API_URL}/store/customers/me/wishlists`;

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

export const handlers = [createWishlistHandler()];

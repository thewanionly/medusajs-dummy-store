import { HttpResponse, delay } from 'msw';

import {
  mockedEmptyWishlist,
  mockedWishlistItemId,
  mockedWishlistWithItem,
} from '../../data/wishlist';
import { storefrontMedusaBffWrapper } from '../utils/apis';
import { withActiveMockGate } from '../utils/withActiveMockGate';

// Happy paths
export const addWishlistItemSuccess = storefrontMedusaBffWrapper.mutation(
  'AddWishlistItem',
  async ({ variables }) => {
    await delay(500);

    const { productVariantId } = (variables || {}) as {
      productVariantId?: string;
    };

    if (!productVariantId) {
      return HttpResponse.json(
        {
          errors: [
            {
              message: 'Missing productVariantId',
            },
          ],
        },
        {
          status: 400,
        }
      );
    }

    const wishlistResponse = {
      ...mockedWishlistWithItem,
      items: mockedWishlistWithItem.items?.map((item) => ({
        ...item,
        productVariantId,
        productVariant: item.productVariant
          ? {
              ...item.productVariant,
              id: productVariantId,
            }
          : null,
      })),
    };

    return HttpResponse.json({
      data: {
        addWishlistItem: {
          wishlist: wishlistResponse,
        },
      },
    });
  }
);

export const removeWishlistItemSuccess = storefrontMedusaBffWrapper.mutation(
  'RemoveWishlistItem',
  async ({ variables }) => {
    await delay(500);

    const { wishlistItemId } = (variables || {}) as {
      wishlistItemId?: string;
    };

    if (!wishlistItemId) {
      return HttpResponse.json(
        {
          errors: [
            {
              message: 'Missing wishlistItemId',
            },
          ],
        },
        {
          status: 400,
        }
      );
    }

    const response =
      wishlistItemId === mockedWishlistItemId
        ? mockedEmptyWishlist
        : mockedWishlistWithItem;

    return HttpResponse.json({
      data: {
        removeWishlistItem: {
          wishlist: response,
        },
      },
    });
  }
);

// Handlers used in the application.
// Use `withActiveMockGate` to enable/disable the handler based on activeMock config
export const handlers = [
  withActiveMockGate('AddWishlistItem', addWishlistItemSuccess),
  withActiveMockGate('RemoveWishlistItem', removeWishlistItemSuccess),
];

// Other paths
export const addWishlistItemError = storefrontMedusaBffWrapper.mutation(
  'AddWishlistItem',
  async () => {
    await delay(500);

    return HttpResponse.json({
      errors: [
        {
          message: 'Failed to add to wishlist',
        },
      ],
    });
  }
);

export const removeWishlistItemError = storefrontMedusaBffWrapper.mutation(
  'RemoveWishlistItem',
  async () => {
    await delay(500);

    return HttpResponse.json({
      errors: [
        {
          message: 'Failed to remove from wishlist',
        },
      ],
    });
  }
);

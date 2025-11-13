import { HttpResponse, delay } from 'msw';

import { storefrontMedusaBffWrapper } from '../utils/apis';
import { withActiveMockGate } from '../utils/withActiveMockGate';

type WishlistItem = {
  id: string;
  productId: string;
  productHandle?: string | null;
  productVariantId: string;
};

const wishlistId = 'wishlist_mock_id';
const wishlistItems = new Map<string, WishlistItem>();
let wishlistItemSequence = 0;

const buildWishlistItem = (item: Omit<WishlistItem, 'id'>): WishlistItem => {
  wishlistItemSequence += 1;
  const generatedId = `wishlist_item_${wishlistItemSequence}`;

  // Persist the generated item for later removal mocks
  const wishlistItem = {
    id: generatedId,
    ...item,
  };

  wishlistItems.set(wishlistItem.productVariantId, wishlistItem);

  return wishlistItem;
};

const getWishlistItemByVariant = (
  productVariantId: string
): WishlistItem | undefined => {
  return wishlistItems.get(productVariantId);
};

/**
 * Storybook helper for resetting wishlist state between stories/tests.
 */
export const resetWishlistMocks = () => {
  wishlistItems.clear();
  wishlistItemSequence = 0;
};

export const addWishlistItemSuccess = storefrontMedusaBffWrapper.mutation(
  'AddWishlistItem',
  async ({ variables }) => {
    await delay(500);

    const input = (
      (variables || {}) as {
        input?: {
          productId: string;
          productHandle?: string;
          productVariantId: string;
        };
      }
    ).input;

    if (!input) {
      return HttpResponse.json(
        {
          errors: [
            {
              message: 'Missing AddWishlistItem input',
            },
          ],
        },
        {
          status: 400,
        }
      );
    }

    const wishlistItem =
      getWishlistItemByVariant(input.productVariantId) ||
      buildWishlistItem({
        productId: input.productId,
        productHandle: input.productHandle,
        productVariantId: input.productVariantId,
      });

    return HttpResponse.json({
      data: {
        addWishlistItem: {
          wishlist: {
            id: wishlistId,
          },
          wishlistItem,
        },
      },
    });
  }
);

export const removeWishlistItemSuccess = storefrontMedusaBffWrapper.mutation(
  'RemoveWishlistItem',
  async ({ variables }) => {
    await delay(500);

    const input = (
      (variables || {}) as {
        input?: {
          productVariantId: string;
          wishlistItemId?: string | null;
        };
      }
    ).input;

    if (!input) {
      return HttpResponse.json(
        {
          errors: [
            {
              message: 'Missing RemoveWishlistItem input',
            },
          ],
        },
        {
          status: 400,
        }
      );
    }

    const existingItem = getWishlistItemByVariant(input.productVariantId);
    const wishlistItem = existingItem || {
      id: input.wishlistItemId || `wishlist_item_${input.productVariantId}`,
      productId: 'unknown-product',
      productHandle: null,
      productVariantId: input.productVariantId,
    };

    wishlistItems.delete(input.productVariantId);

    return HttpResponse.json({
      data: {
        removeWishlistItem: {
          wishlist: {
            id: wishlistId,
          },
          wishlistItem,
        },
      },
    });
  }
);

export const handlers = [
  withActiveMockGate('AddWishlistItem', addWishlistItemSuccess),
  withActiveMockGate('RemoveWishlistItem', removeWishlistItemSuccess),
];

export const addWishlistItemError = storefrontMedusaBffWrapper.mutation(
  'AddWishlistItem',
  async () => {
    await delay(500);

    return HttpResponse.json(
      {
        errors: [
          {
            message: 'Failed to add to wishlist',
          },
        ],
      },
      {
        status: 500,
      }
    );
  }
);

export const removeWishlistItemError = storefrontMedusaBffWrapper.mutation(
  'RemoveWishlistItem',
  async () => {
    await delay(500);

    return HttpResponse.json(
      {
        errors: [
          {
            message: 'Failed to remove from wishlist',
          },
        ],
      },
      {
        status: 500,
      }
    );
  }
);

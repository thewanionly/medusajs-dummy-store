import { HttpResponse, delay } from 'msw';

import { storefrontMedusaBffWrapper } from '../utils/apis';
import { withActiveMockGate } from '../utils/withActiveMockGate';

type WishlistItem = {
  id: string;
  productVariantId: string;
};

const wishlistId = 'wishlist_mock_id';
const wishlistItems = new Map<string, WishlistItem>();
let wishlistItemSequence = 0;

const buildMockPrice = () => ({
  amount: 1000,
  currencyCode: 'USD',
  priceType: 'default',
});

const buildMockProductVariant = (productVariantId: string) => ({
  id: productVariantId,
  sku: `sku_${productVariantId}`,
  inventoryQuantity: 10,
  allowBackorder: false,
  manageInventory: true,
  options: [],
  price: buildMockPrice(),
  originalPrice: buildMockPrice(),
});

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

const buildWishlistResponse = () => ({
  id: wishlistId,
  items: Array.from(wishlistItems.values()).map((item) => ({
    id: item.id,
    wishlistId,
    productVariantId: item.productVariantId,
    productVariant: buildMockProductVariant(item.productVariantId),
  })),
});

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

    if (!getWishlistItemByVariant(productVariantId)) {
      buildWishlistItem({
        productVariantId,
      });
    }

    return HttpResponse.json({
      data: {
        addWishlistItem: {
          wishlist: buildWishlistResponse(),
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

    const entryToDelete = Array.from(wishlistItems.entries()).find(
      ([, item]) => item.id === wishlistItemId
    );

    if (entryToDelete) {
      wishlistItems.delete(entryToDelete[0]);
    }

    return HttpResponse.json({
      data: {
        removeWishlistItem: {
          wishlist: buildWishlistResponse(),
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

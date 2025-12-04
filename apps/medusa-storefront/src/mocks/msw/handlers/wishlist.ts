import { HttpResponse, delay } from 'msw';

import {
  mockedEmptyWishlist,
  mockedWishlistWithItem,
  mockedWishlistWithMultipleItems,
} from '../../data/wishlist';
import { storefrontMedusaBffWrapper } from '../utils/apis';
import { withActiveMockGate } from '../utils/withActiveMockGate';

// Happy paths
export const getCustomerWishlistSuccess = storefrontMedusaBffWrapper.query(
  'GetCustomerWishlist',
  async () => {
    await delay(500);

    return HttpResponse.json({
      data: {
        wishlist: mockedWishlistWithMultipleItems,
      },
    });
  }
);

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

    const remainingItems = mockedWishlistWithMultipleItems.items?.filter(
      (item) => item.id !== wishlistItemId
    );

    const response = {
      ...mockedWishlistWithMultipleItems,
      items: remainingItems ?? mockedEmptyWishlist.items,
    };

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
  withActiveMockGate('GetCustomerWishlist', getCustomerWishlistSuccess),
  withActiveMockGate('AddWishlistItem', addWishlistItemSuccess),
  withActiveMockGate('RemoveWishlistItem', removeWishlistItemSuccess),
];

// Other paths
export const getCustomerWishlistEmpty = storefrontMedusaBffWrapper.query(
  'GetCustomerWishlist',
  async () => {
    await delay(500);

    return HttpResponse.json({
      data: {
        wishlist: mockedEmptyWishlist,
      },
    });
  }
);

export const getCustomerWishlistError = storefrontMedusaBffWrapper.query(
  'GetCustomerWishlist',
  async () => {
    await delay(500);

    return HttpResponse.json({
      errors: [
        {
          message: 'Unable to load wishlist items',
        },
      ],
    });
  }
);

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

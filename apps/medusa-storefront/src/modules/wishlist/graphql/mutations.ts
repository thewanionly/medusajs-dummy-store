import { gql } from '@apollo/client';

export const ADD_WISHLIST_ITEM_MUTATION = gql`
  mutation AddWishlistItem($input: AddWishlistItemInput!) {
    addWishlistItem(input: $input) {
      wishlist {
        id
      }
      wishlistItem {
        id
        productId
        productHandle
        productVariantId
      }
    }
  }
`;

export const REMOVE_WISHLIST_ITEM_MUTATION = gql`
  mutation RemoveWishlistItem($input: RemoveWishlistItemInput!) {
    removeWishlistItem(input: $input) {
      wishlist {
        id
      }
      wishlistItem {
        id
        productVariantId
      }
    }
  }
`;

export type WishlistItemGraphQL = {
  id: string;
  productId: string;
  productHandle?: string | null;
  productVariantId: string;
};

export type AddWishlistItemMutationResult = {
  addWishlistItem: {
    wishlist: {
      id: string;
    };
    wishlistItem: WishlistItemGraphQL;
  };
};

export type AddWishlistItemMutationVariables = {
  input: {
    productId: string;
    productHandle?: string;
    productVariantId: string;
  };
};

export type RemoveWishlistItemMutationResult = {
  removeWishlistItem: {
    wishlist: {
      id: string;
    };
    wishlistItem: {
      id: string;
      productVariantId: string;
    };
  };
};

export type RemoveWishlistItemMutationVariables = {
  input: {
    productVariantId: string;
    wishlistItemId?: string | null;
  };
};

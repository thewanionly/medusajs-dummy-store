import { gql } from '@apollo/client';

import { WISHLIST_FRAGMENT } from '../fragments/wishlist';
import type { WishlistGraphQL } from '../mutations/wishlist';

export const GET_CUSTOMER_WISHLIST_QUERY = gql`
  query GetCustomerWishlist {
    wishlist {
      ...Wishlist
    }
  }
  ${WISHLIST_FRAGMENT}
`;

export type GetCustomerWishlistQueryResult = {
  wishlist: WishlistGraphQL | null;
};

export type GetCustomerWishlistQueryVariables = Record<string, never>;

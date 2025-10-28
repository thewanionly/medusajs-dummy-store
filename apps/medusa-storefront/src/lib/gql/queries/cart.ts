import { gql } from '@apollo/client';

import { CART_FRAGMENT } from '../fragments/cart';

export const GET_CART_QUERY = gql`
  query GetCart($id: ID!) {
    getCart(id: $id) {
      ...CartFields
    }
  }
  ${CART_FRAGMENT}
`;

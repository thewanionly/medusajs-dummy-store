import { gql } from '@apollo/client';

import { PRODUCT_VARIANT_FRAGMENT } from './product';

export const WISHLIST_FRAGMENT = gql`
  fragment Wishlist on Wishlist {
    id
    items {
      id
      wishlistId
      productVariantId
      productVariant {
        ...ProductVariant
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

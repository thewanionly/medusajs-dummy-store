import { gql } from '@apollo/client';

import { PRODUCT_IMAGE_FRAGMENT, PRODUCT_VARIANT_FRAGMENT } from './product';

export const WISHLIST_FRAGMENT = gql`
  fragment Wishlist on Wishlist {
    id
    items {
      id
      wishlistId
      productVariantId
      productVariant {
        ...ProductVariant
        product {
          id
          title
          handle
          thumbnail
          images {
            ...ProductImage
          }
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
  ${PRODUCT_IMAGE_FRAGMENT}
`;

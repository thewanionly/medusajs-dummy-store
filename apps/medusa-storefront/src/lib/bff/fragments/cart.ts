import { gql } from '@apollo/client';

import { PRODUCT_VARIANT_FRAGMENT } from './product';

export const LINE_ITEM_FRAGMENT = gql`
  fragment CartItemFields on LineItem {
    id
    title
    quantity
    unit_price
    created_at
    thumbnail
    product_handle
    total
    original_total
    variant {
      ...ProductVariant
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

export const ADDRESS_FRAGMENT = gql`
  fragment AddressFields on Address {
    first_name
    last_name
    phone
    address_1
    city
    country_code
    postal_code
  }
`;

export const SHIPPING_METHODS_FRAGMENT = gql`
  fragment ShippingMethodFields on ShippingMethod {
    id
    name
    amount
  }
`;

export const CART_FRAGMENT = gql`
  fragment CartFields on Cart {
    id
    region_id
    email
    total
    subtotal
    original_total
    currency_code
    items {
      ...CartItemFields
    }
    shipping_address {
      ...AddressFields
    }
    billing_address {
      ...AddressFields
    }
  }
  ${LINE_ITEM_FRAGMENT}
  ${ADDRESS_FRAGMENT}
`;

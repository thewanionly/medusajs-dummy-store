import { gql } from '@apollo/client';

export const LINE_ITEM_FRAGMENT = gql`
  fragment CartItemFields on LineItem {
    id
    title
    quantity
    unit_price
  }
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

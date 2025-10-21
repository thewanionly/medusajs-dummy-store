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
    product_title
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
    cart_id
    name
    amount
    is_tax_inclusive
    shipping_option_id
  }
`;

export const PAYMENT_COLLECTION_FRAGMENT = gql`
  fragment PaymentCollectionFields on PaymentCollection {
    id
    currency_code
    amount
    status
    payment_providers {
      id
    }
    payment_sessions {
      id
      amount
      currency_code
      provider_id
      data
      status
    }
  }
`;

export const COUNTRY_FRAGMENT = gql`
  fragment CountryFields on Country {
    id
    iso_2
    iso_3
    name
    display_name
  }
`;

export const REGION_FRAGMENT = gql`
  fragment RegionFields on Region {
    id
    name
    currency_code
    automatic_taxes
    created_at
    updated_at
    countries {
      ...CountryFields
    }
  }
  ${COUNTRY_FRAGMENT}
`;

export const CART_FRAGMENT = gql`
  fragment CartFields on Cart {
    id
    region_id
    email
    total
    subtotal
    tax_total
    discount_total
    gift_card_total
    shipping_subtotal
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
    region {
      ...RegionFields
    }
    shipping_methods {
      ...ShippingMethodFields
    }
    payment_collection {
      ...PaymentCollectionFields
    }
  }
  ${LINE_ITEM_FRAGMENT}
  ${ADDRESS_FRAGMENT}
  ${REGION_FRAGMENT}
  ${SHIPPING_METHODS_FRAGMENT}
  ${PAYMENT_COLLECTION_FRAGMENT}
`;

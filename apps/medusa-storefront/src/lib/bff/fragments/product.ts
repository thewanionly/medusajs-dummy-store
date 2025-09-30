import { gql } from '@apollo/client';

export const PRODUCT_CORE_FRAGMENT = gql`
  fragment ProductCore on Product {
    id
    title
    handle
    description
    status
    thumbnail
    metadata
    weight
    collection_id
    length
    height
    width
    hs_code
    mid_code
    material
    country_of_origin
    type_id
    created_at
    updated_at
    is_giftcard
    origin_country
    discountable
    external_id
    deleted_at
    subtitle
  }
`;

export const PRODUCT_IMAGE_FRAGMENT = gql`
  fragment ProductImage on ProductImage {
    id
    url
    metadata
  }
`;

export const PRODUCT_TAG_FRAGMENT = gql`
  fragment ProductTag on ProductTag {
    id
    value
    metadata
  }
`;

export const PRODUCT_OPTION_FRAGMENT = gql`
  fragment ProductOption on ProductOption {
    id
    title
    values {
      id
      value
    }
  }
`;

export const CALCULATED_PRICE_FRAGMENT = gql`
  fragment CalculatedPrice on CalculatedPrice {
    calculated_amount
    is_calculated_price_price_list
    is_calculated_price_tax_inclusive
    calculated_price {
      amount
      currency_code
    }
    original_amount
    original_price {
      amount
      currency_code
    }
    currency_code
    price_list_id
    price_list_type
    min_quantity
    max_quantity
  }
`;

export const PRODUCT_VARIANT_FRAGMENT = gql`
  fragment ProductVariant on ProductVariant {
    id
    title
    sku
    barcode
    ean
    upc
    inventory_quantity
    allow_backorder
    manage_inventory
    weight
    length
    height
    width
    hs_code
    mid_code
    material
    country_of_origin
    metadata
    variant_rank
    product_id
    options {
      id
      option_id
      value
    }
    calculated_price {
      ...CalculatedPrice
    }
    created_at
    updated_at
  }
  ${CALCULATED_PRICE_FRAGMENT}
`;

export const PRODUCT_CATEGORY_FRAGMENT = gql`
  fragment ProductCategory on ProductCategory {
    id
    name
    description
    handle
    is_active
    is_internal
    rank
    metadata
    parent_category_id
    created_at
    deleted_at
    updated_at
  }
`;

export const PRODUCT_COLLECTION_FRAGMENT = gql`
  fragment ProductCollection on Collection {
    id
    title
    handle
    metadata
    created_at
    updated_at
    deleted_at
  }
`;

export const PRODUCT_FULL_FRAGMENT = gql`
  fragment ProductFull on Product {
    ...ProductCore
    images {
      ...ProductImage
    }
    tags {
      ...ProductTag
    }
    options {
      ...ProductOption
    }
    variants {
      ...ProductVariant
    }
    collection {
      ...ProductCollection
    }
    categories {
      ...ProductCategory
    }
  }
  ${PRODUCT_CORE_FRAGMENT}
  ${PRODUCT_IMAGE_FRAGMENT}
  ${PRODUCT_TAG_FRAGMENT}
  ${PRODUCT_OPTION_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  ${PRODUCT_COLLECTION_FRAGMENT}
  ${PRODUCT_CATEGORY_FRAGMENT}
`;

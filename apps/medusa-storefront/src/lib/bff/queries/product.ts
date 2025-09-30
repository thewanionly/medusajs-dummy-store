import { gql } from '@apollo/client';

import {
  PRODUCT_CATEGORY_FRAGMENT,
  PRODUCT_COLLECTION_FRAGMENT,
  PRODUCT_CORE_FRAGMENT,
  PRODUCT_FULL_FRAGMENT,
} from '../fragments/product';

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts(
    $limit: Int
    $offset: Int
    $handle: String
    $region_id: String
    $category_id: [String]
    $collection_id: [String]
    $q: String
    $id: [ID!]
  ) {
    products(
      limit: $limit
      offset: $offset
      handle: $handle
      region_id: $region_id
      category_id: $category_id
      collection_id: $collection_id
      q: $q
      id: $id
    ) {
      products {
        ...ProductFull
      }
      count
      offset
      limit
    }
  }
  ${PRODUCT_FULL_FRAGMENT}
`;

export const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: ID!, $region_id: String) {
    product(id: $id, region_id: $region_id) {
      ...ProductFull
    }
  }
  ${PRODUCT_FULL_FRAGMENT}
`;

export const GET_PRODUCT_CATEGORIES_QUERY = gql`
  query GetProductCategories(
    $limit: Int
    $offset: Int
    $q: String
    $handle: String
    $is_active: Boolean
    $is_internal: Boolean
    $include_descendants_tree: Boolean
    $parent_category_id: String
  ) {
    productCategories(
      limit: $limit
      offset: $offset
      q: $q
      handle: $handle
      is_active: $is_active
      is_internal: $is_internal
      include_descendants_tree: $include_descendants_tree
      parent_category_id: $parent_category_id
    ) {
      ...ProductCategory
      parent_category {
        id
        name
        handle
        parent_category {
          id
          name
          handle
        }
      }
      category_children {
        ...ProductCategory
      }
      products {
        ...ProductCore
      }
    }
  }
  ${PRODUCT_CATEGORY_FRAGMENT}
  ${PRODUCT_CORE_FRAGMENT}
`;

export const GET_PRODUCT_CATEGORY_QUERY = gql`
  query GetProductCategory($id: ID, $handle: String) {
    productCategory(id: $id, handle: $handle) {
      ...ProductCategory
      parent_category {
        id
        name
        handle
        parent_category {
          id
          name
          handle
        }
      }
      category_children {
        ...ProductCategory
      }
      products {
        ...ProductCore
      }
    }
  }
  ${PRODUCT_CATEGORY_FRAGMENT}
  ${PRODUCT_CORE_FRAGMENT}
`;

export const GET_COLLECTIONS_QUERY = gql`
  query GetCollections($limit: Int, $offset: Int, $handle: [String]) {
    collections(limit: $limit, offset: $offset, handle: $handle) {
      ...ProductCollection
      products {
        ...ProductCore
      }
    }
  }
  ${PRODUCT_COLLECTION_FRAGMENT}
  ${PRODUCT_CORE_FRAGMENT}
`;

export const GET_COLLECTION_QUERY = gql`
  query GetCollection($id: ID, $handle: String) {
    collection(id: $id, handle: $handle) {
      ...ProductCollection
      products {
        ...ProductCore
      }
    }
  }
  ${PRODUCT_COLLECTION_FRAGMENT}
  ${PRODUCT_FULL_FRAGMENT}
`;

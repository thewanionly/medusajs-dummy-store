import { gql } from '@apollo/client';

import {
  PRODUCT_CATEGORY_FRAGMENT,
  PRODUCT_COLLECTION_FRAGMENT,
  PRODUCT_FRAGMENT,
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
    $is_giftcard: Boolean
    $id: [ID!]
    $tag_id: [String!]
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
      is_giftcard: $is_giftcard
      tag_id: $tag_id
    ) {
      products {
        ...Product
      }
      count
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const SEARCH_PRODUCTS_QUERY = gql`
  query SearchProducts($query: String!) {
    search(query: $query) {
      hits {
        id
        title
        description
        handle
        thumbnail
        categories {
          id
          name
          handle
        }
        tags {
          id
          value
          metadata
          created_at
          updated_at
          deleted_at
        }
        objectID
        _highlightResult {
          id {
            value
            matchLevel
            matchedWords
          }
          title {
            value
            matchLevel
            fullyHighlighted
            matchedWords
          }
          description {
            value
            matchLevel
            matchedWords
          }
          handle {
            value
            matchLevel
            fullyHighlighted
            matchedWords
          }
          thumbnail {
            value
            matchLevel
            matchedWords
          }
          tags {
            id {
              value
              matchLevel
              matchedWords
            }
            value {
              value
              matchLevel
              matchedWords
            }
            created_at {
              value
              matchLevel
              matchedWords
            }
            updated_at {
              value
              matchLevel
              matchedWords
            }
          }
        }
      }
      nbHits
      page
      nbPages
      hitsPerPage
      exhaustiveNbHits
      exhaustiveTypo
      exhaustive {
        nbHits
        typo
      }
      query
      params
      index
      renderingContent
      processingTimeMS
      processingTimingsMS {
        _request {
          roundTrip
        }
        afterFetch {
          format {
            highlighting
            total
          }
        }
        fetch {
          total
        }
        total
      }
      serverTimeMS
    }
  }
`;

export const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: ID!, $region_id: String) {
    product(id: $id, region_id: $region_id) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_CATEGORIES_QUERY = gql`
  query GetProductCategories(
    $limit: Int
    $offset: Int
    $q: String
    $handle: String
    $parent_category_id: String
  ) {
    productCategories(
      limit: $limit
      offset: $offset
      q: $q
      handle: $handle
      parent_category_id: $parent_category_id
    ) {
      ...ProductCategory
      parent_category {
        ...ProductCategory
      }
      category_children {
        ...ProductCategory
      }
      products {
        ...Product
      }
    }
  }
  ${PRODUCT_CATEGORY_FRAGMENT}
  ${PRODUCT_FRAGMENT}
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
        ...Product
      }
    }
  }
  ${PRODUCT_CATEGORY_FRAGMENT}
  ${PRODUCT_FRAGMENT}
`;

export const GET_COLLECTIONS_QUERY = gql`
  query GetCollections($limit: Int, $offset: Int, $handle: [String]) {
    collections(limit: $limit, offset: $offset, handle: $handle) {
      ...ProductCollection
      products {
        ...Product
      }
    }
  }
  ${PRODUCT_COLLECTION_FRAGMENT}
  ${PRODUCT_FRAGMENT}
`;

export const GET_COLLECTION_QUERY = gql`
  query GetCollection($id: ID, $handle: String) {
    collection(id: $id, handle: $handle) {
      ...ProductCollection
      products {
        ...Product
      }
    }
  }
  ${PRODUCT_COLLECTION_FRAGMENT}
  ${PRODUCT_FRAGMENT}
`;

import { gql } from '@apollo/client';

export const GET_PRODUCTS_QUERY = gql`
  query GetProducts(
    $limit: Int
    $offset: Int
    $filters: ProductFilters
    $region_id: String
    $fields: String
  ) {
    products(
      limit: $limit
      offset: $offset
      filters: $filters
      region_id: $region_id
      fields: $fields
    ) {
      products {
        id
        title
        handle
        description
        status
        thumbnail
        images {
          id
          url
          metadata
        }
        metadata
        tags {
          id
          value
          metadata
        }
        variants {
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
          calculated_price {
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
          created_at
          updated_at
        }
        collection {
          id
          title
          handle
          metadata
          created_at
          updated_at
        }
        collection_id
        categories {
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
          updated_at
        }
        weight
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
      }
      count
      offset
      limit
    }
  }
`;

export const GET_PRODUCT_QUERY = gql`
  query GetProduct($id: ID!, $region_id: String, $fields: String) {
    product(id: $id, region_id: $region_id, fields: $fields) {
      id
      title
      handle
      description
      status
      thumbnail
      images {
        id
        url
        metadata
      }
      metadata
      tags {
        id
        value
        metadata
      }
      variants {
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
        calculated_price {
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
        created_at
        updated_at
      }
      collection {
        id
        title
        handle
        metadata
        created_at
        updated_at
      }
      collection_id
      categories {
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
        updated_at
      }
      weight
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
    }
  }
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
    $fields: String
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
      fields: $fields
    ) {
      id
      name
      description
      handle
      is_active
      is_internal
      rank
      metadata
      parent_category_id
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
        id
        name
        description
        handle
        is_active
        is_internal
        rank
        metadata
        parent_category_id
      }
      products {
        id
        title
        handle
        thumbnail
      }
      created_at
      updated_at
    }
  }
`;

export const GET_PRODUCT_CATEGORY_QUERY = gql`
  query GetProductCategory($id: ID, $handle: String, $fields: String) {
    productCategory(id: $id, handle: $handle, fields: $fields) {
      id
      name
      description
      handle
      is_active
      is_internal
      rank
      metadata
      parent_category_id
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
        id
        name
        description
        handle
        is_active
        is_internal
        rank
        metadata
        parent_category_id
      }
      products {
        id
        title
        handle
        thumbnail
        variants {
          id
          calculated_price {
            calculated_amount
            calculated_price {
              amount
              currency_code
            }
          }
        }
      }
      created_at
      updated_at
    }
  }
`;

export const GET_COLLECTIONS_QUERY = gql`
  query GetCollections(
    $limit: Int
    $offset: Int
    $handle: [String]
    $fields: String
  ) {
    collections(
      limit: $limit
      offset: $offset
      handle: $handle
      fields: $fields
    ) {
      id
      title
      handle
      metadata
      products {
        id
        title
        handle
        thumbnail
        variants {
          id
          calculated_price {
            calculated_amount
            calculated_price {
              amount
              currency_code
            }
          }
        }
      }
      created_at
      updated_at
    }
  }
`;

export const GET_COLLECTION_QUERY = gql`
  query GetCollection($id: ID, $handle: String, $fields: String) {
    collection(id: $id, handle: $handle, fields: $fields) {
      id
      title
      handle
      metadata
      products {
        id
        title
        handle
        description
        thumbnail
        images {
          id
          url
        }
        variants {
          id
          title
          inventory_quantity
          calculated_price {
            calculated_amount
            calculated_price {
              amount
              currency_code
            }
          }
        }
        tags {
          id
          value
        }
      }
      created_at
      updated_at
    }
  }
`;

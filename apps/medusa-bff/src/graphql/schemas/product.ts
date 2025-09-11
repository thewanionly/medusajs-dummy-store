export const productTypeDefs = `
  type ProductTag {
    id: ID!
    value: String!
  }

  type ProductImage {
    id: ID!
    url: String!
    rank: Int
    created_at: String
    updated_at: String
    deleted_at: String
  }

  type ProductVariantOption {
    id: ID!
    option_id: String!
    value: String!
  }

  type ProductVariant {
    id: ID!
    title: String
    sku: String
    barcode: String
    ean: String
    upc: String
    allow_backorder: Boolean
    manage_inventory: Boolean
    hs_code: String
    origin_country: String
    mid_code: String
    material: String
    weight: Int
    length: Int
    height: Int
    width: Int
    options: [ProductVariantOption!]
    inventory_quantity: Int
    product_id: String!
    variant_rank: Int
    metadata: String
    created_at: String
    updated_at: String
    deleted_at: String
  }

  type ProductOptionValue {
    id: ID!
    value: String!
  }

  type ProductOption {
    id: ID!
    title: String!
    values: [ProductOptionValue!]
  }

  type ProductCategory {
    id: ID!
    name: String!
    description: String
    handle: String!
    parent_category_id: String
    rank: Int
    metadata: String
    created_at: String
    updated_at: String
    deleted_at: String
  }

  type Product {
    id: ID!
    title: String!
    handle: String
    description: String
    subtitle: String
    is_giftcard: Boolean
    discountable: Boolean
    status: String
    external_id: String
    thumbnail: String
    weight: Int
    length: Int
    height: Int
    width: Int
    origin_country: String
    hs_code: String
    mid_code: String
    material: String
    collection_id: String
    type_id: String
    tags: [ProductTag!]
    images: [ProductImage!]
    options: [ProductOption!]
    variants: [ProductVariant!]
    categories: [ProductCategory!]
    created_at: String
    updated_at: String
    deleted_at: String
    metadata: String
  }

  type ProductListResponse {
    products: [Product!]!
    count: Int!
    limit: Int
    offset: Int
  }

  extend type Query {
    products(limit: Int, offset: Int): ProductListResponse!
    product(id: ID!): Product
  }
`;

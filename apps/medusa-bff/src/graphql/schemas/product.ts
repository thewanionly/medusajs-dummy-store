export const productTypeDefs = `
  input ProductFilters {
    id: [String]
    title: String
    handle: String
    status: [String]
    collection_id: [String]
    type_id: [String]
    tags: [String]
    categories: [String]
    is_giftcard: Boolean
    discountable: Boolean
    created_at: String
    updated_at: String
  }

  type Money {
    amount: Float
    currency_code: String
  }

  type CalculatedPrice {
    calculated_amount: Float
    is_calculated_price_price_list: Boolean
    is_calculated_price_tax_inclusive: Boolean
    calculated_price: Money
    original_amount: Float
    original_price: Money
    currency_code: String
    price_list_id: String
    price_list_type: String
    min_quantity: Int
    max_quantity: Int
  }

  type ProductTag {
    id: ID!
    value: String!
    metadata: String
  }

  type ProductImage {
    id: ID!
    url: String!
    rank: Int
    metadata: String
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
    country_of_origin: String
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
    calculated_price: CalculatedPrice
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
    is_active: Boolean
    is_internal: Boolean
    metadata: String
    parent_category: ProductCategory
    category_children: [ProductCategory!]
    products: [Product!]
    created_at: String
    updated_at: String
    deleted_at: String
  }

  type Collection {
    id: ID!
    title: String!
    handle: String
    metadata: String
    products: [Product!]
    created_at: String
    updated_at: String
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
    country_of_origin: String
    hs_code: String
    mid_code: String
    material: String
    collection_id: String
    collection: Collection
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
    products(
      limit: Int
      offset: Int
      filters: ProductFilters
    ): ProductListResponse!
    product(
      id: ID!
    ): Product
    productCategories(
      limit: Int
      offset: Int
      q: String
      handle: String
      is_active: Boolean
      is_internal: Boolean
      include_descendants_tree: Boolean
      parent_category_id: String
    ): [ProductCategory!]!
    productCategory(
      id: ID!
      handle: String
    ): ProductCategory
    collections(
      limit: Int
      offset: Int
      handle: [String]
    ): [Collection!]!
    collection(
      id: ID!
      handle: String
    ): Collection
  }
`;

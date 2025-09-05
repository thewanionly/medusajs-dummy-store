export const productTypeDefs = `
  type Product {
    id: ID!
    title: String!
    handle: String
    description: String
    status: String
    thumbnail: String
    images: [ProductImage]
    metadata: JSON
    tags: [ProductTag]
    variants: [ProductVariant]
    collection: Collection
    collection_id: String
    categories: [ProductCategory]
    weight: Float
    length: Float
    height: Float
    width: Float
    hs_code: String
    mid_code: String
    material: String
    country_of_origin: String
    type_id: String
    created_at: String
    updated_at: String
  }

  type ProductVariant {
    id: ID!
    title: String!
    sku: String
    barcode: String
    ean: String
    upc: String
    inventory_quantity: Int
    allow_backorder: Boolean
    manage_inventory: Boolean
    weight: Float
    length: Float
    height: Float
    width: Float
    hs_code: String
    mid_code: String
    material: String
    country_of_origin: String
    metadata: JSON
    variant_rank: Int
    product_id: String!
    calculated_price: ProductVariantPrice
    created_at: String
    updated_at: String
  }

  type ProductVariantPrice {
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

  type Money {
    amount: Float
    currency_code: String
  }

  type ProductImage {
    id: ID!
    url: String!
    metadata: JSON
  }

  type ProductTag {
    id: ID!
    value: String!
    metadata: JSON
  }

  type ProductCategory {
    id: ID!
    name: String!
    description: String
    handle: String!
    is_active: Boolean
    is_internal: Boolean
    rank: Int
    metadata: JSON
    parent_category_id: String
    parent_category: ProductCategory
    category_children: [ProductCategory]
    products: [Product]
    created_at: String
    updated_at: String
  }

  type Collection {
    id: ID!
    title: String!
    handle: String!
    metadata: JSON
    products: [Product]
    created_at: String
    updated_at: String
  }

  type ProductsResponse {
    products: [Product!]!
    count: Int!
    offset: Int!
    limit: Int!
  }

  input ProductFilters {
    q: String
    id: [String]
    status: [String]
    handle: [String]
    is_giftcard: Boolean
    category_id: [String]
    collection_id: [String]
    tag_id: [String]
    type_id: [String]
    variants: ProductVariantFilters
    created_at: DateComparisonOperator
    updated_at: DateComparisonOperator
  }

  input ProductVariantFilters {
    q: String
    id: [String]
    sku: [String]
    barcode: [String]
    ean: [String]
    upc: [String]
    title: [String]
    inventory_quantity: NumberComparisonOperator
    allow_backorder: Boolean
    manage_inventory: Boolean
    created_at: DateComparisonOperator
    updated_at: DateComparisonOperator
  }

  input DateComparisonOperator {
    lt: String
    gt: String
    lte: String
    gte: String
  }

  input NumberComparisonOperator {
    lt: Float
    gt: Float
    lte: Float
    gte: Float
  }

  scalar JSON

  extend type Query {
    products(
      limit: Int = 20
      offset: Int = 0
      filters: ProductFilters
      region_id: String
      fields: String
    ): ProductsResponse!
    
    product(
      id: ID!
      region_id: String
      fields: String
    ): Product
    
    productCategories(
      limit: Int = 20
      offset: Int = 0
      q: String
      handle: String
      is_active: Boolean
      is_internal: Boolean
      include_descendants_tree: Boolean = false
      parent_category_id: String
      fields: String
    ): [ProductCategory!]!
    
    productCategory(
      id: ID
      handle: String
      fields: String
    ): ProductCategory
    
    collections(
      limit: Int = 20
      offset: Int = 0
      handle: [String]
      fields: String
    ): [Collection!]!
    
    collection(
      id: ID
      handle: String
      fields: String
    ): Collection
  }
`;

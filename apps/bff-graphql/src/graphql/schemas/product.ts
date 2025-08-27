export const productTypeDefs = `
  type Product {
    id: ID!
    title: String!
    handle: String
    description: String
    status: String
    thumbnail: String
    created_at: String
    updated_at: String
  }

  extend type Query {
    products: [Product!]!
    product(id: ID!): Product
  }
`;

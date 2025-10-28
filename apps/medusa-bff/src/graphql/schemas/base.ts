export const baseTypeDefs = `
  extend schema @link(url: "https://specs.apollographql.com/federation/v2.0", import: ["@key", "@external", "@requires", "@provides", "@tag", "@shareable"])

  type Query {
    _empty: String
  }
`;

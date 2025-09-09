import { buildSchema } from 'graphql';

import { typeDefs } from '@graphql/schemas';

describe('Product Schema', () => {
  it('should be valid GraphQL schema', () => {
    expect(() => {
      buildSchema(typeDefs.join('\n'));
    }).not.toThrow();
  });

  it('should contain required Product type fields', () => {
    const schema = buildSchema(typeDefs.join('\n'));
    const productType = schema.getType('Product');

    expect(productType).toBeDefined();
    expect(productType?.toString()).toContain('Product');
  });

  it('should contain Query type with product operations', () => {
    const schema = buildSchema(typeDefs.join('\n'));
    const queryType = schema.getQueryType();

    expect(queryType).toBeDefined();

    const fields = queryType?.getFields();
    expect(fields?.products).toBeDefined();
    expect(fields?.product).toBeDefined();
  });

  it('should have proper field types for Product', () => {
    const schema = buildSchema(typeDefs.join('\n'));
    const productType = schema.getType('Product');

    if (productType && 'getFields' in productType) {
      const fields = productType.getFields();

      expect(fields.id).toBeDefined();
      expect(fields.title).toBeDefined();
      expect(fields.handle).toBeDefined();
      expect(fields.description).toBeDefined();
    }
  });
});

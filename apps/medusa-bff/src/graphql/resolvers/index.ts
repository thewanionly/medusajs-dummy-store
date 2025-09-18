import { GraphQLJSON } from 'graphql-scalars';

import { productResolvers } from '@graphql/resolvers/product';

export const resolvers = {
  JSON: GraphQLJSON,
  ...productResolvers,
};

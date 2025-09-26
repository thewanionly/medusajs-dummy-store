import { GraphQLJSON } from 'graphql-scalars';

import { productResolvers } from './product';

export const resolvers = {
  JSON: GraphQLJSON,
  ...productResolvers,
};

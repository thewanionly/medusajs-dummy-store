import { GraphQLJSON } from 'graphql-scalars';

import { cartResolvers } from './cart';
import { productResolvers } from './product';

export const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    ...(productResolvers.Query || {}),
    ...(cartResolvers.Query || {}),
  },
  Mutation: {
    ...(cartResolvers.Mutation || {}),
  },
};

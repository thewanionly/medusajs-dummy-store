import { GraphQLJSON } from 'graphql-scalars';

import { customerResolvers } from './customer';
import { productResolvers } from './product';

export const resolvers = {
  JSON: GraphQLJSON,
  ...productResolvers,
  ...customerResolvers,
};

import { GraphQLJSON } from 'graphql-scalars';

import { mergeResolvers } from '@graphql-tools/merge';
import { IResolvers } from '@graphql-tools/utils';

import { cartResolvers } from './cart';
import { productResolvers } from './product';

export const resolvers: IResolvers = mergeResolvers([
  { JSON: GraphQLJSON },
  productResolvers,
  cartResolvers,
]);

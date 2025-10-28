import { mergeResolvers } from '@graphql-tools/merge';
import { Resolvers } from '@graphql/generated/graphql';

import { customerResolvers } from './customer';
import { productResolvers } from './product';
import { sanityResolvers } from './sanity';
import { scalarsResolver } from './scalars';

export const resolvers = mergeResolvers([
  scalarsResolver,
  productResolvers,
  customerResolvers,
  ...sanityResolvers,
]) as Resolvers;

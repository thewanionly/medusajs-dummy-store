import { mergeResolvers } from '@graphql-tools/merge';
import { Resolvers } from '@graphql/generated/graphql';

import { cartResolvers } from './cart';
import { customerResolvers } from './customer';
import { productResolvers } from './product';
import { sanityResolvers } from './sanity';
import { scalarsResolver } from './scalars';

export const resolvers = mergeResolvers([
  scalarsResolver,
  productResolvers,
  customerResolvers,
  ...sanityResolvers,
  cartResolvers,
]) as Resolvers;

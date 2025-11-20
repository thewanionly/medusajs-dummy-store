import { mergeResolvers } from '@graphql-tools/merge';
import { Resolvers } from '@graphql/generated/graphql';

import { customerResolvers } from './customer';
import { productResolvers } from './product';
import { sanityResolvers } from './sanity';
import { scalarsResolver } from './scalars';
import { wishlistResolvers } from './wishlist';

export const resolvers = mergeResolvers([
  scalarsResolver,
  productResolvers,
  customerResolvers,
  wishlistResolvers,
  ...sanityResolvers,
]) as Resolvers;

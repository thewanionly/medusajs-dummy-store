import { mergeResolvers } from '@graphql-tools/merge';
import { Resolvers } from '@graphql/generated/graphql';

import { customerResolvers } from './customer';
import { productResolvers } from './product';
import { scalarsResolver } from './scalars';

export const resolvers = mergeResolvers([
  scalarsResolver,
  productResolvers,
  customerResolvers,
import { mergeResolvers } from '@graphql-tools/merge';
import { Resolvers } from '@graphql/generated/graphql';

import { productResolvers } from './product';
import { sanityResolvers } from './sanity';

const scalarsResolver = {
  JSON: GraphQLJSON,
};

export const resolvers = mergeResolvers([
  scalarsResolver,
  productResolvers,
  ...sanityResolvers,
]) as Resolvers;

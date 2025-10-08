// Export fragments
export * from './fragments/product';

// Export queries
export * from './queries/product';

// Export Apollo client and utilities
export {
  default as apolloClient,
  graphqlFetch,
} from './apollo-client';

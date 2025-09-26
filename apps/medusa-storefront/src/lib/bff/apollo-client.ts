import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  OperationVariables,
} from '@apollo/client';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache({}),
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
});

export async function graphqlFetch<
  TResult,
  TVariables extends OperationVariables,
>(
  options: ApolloClient.QueryOptions<TResult, TVariables>
): Promise<TResult | undefined> {
  try {
    const { data } = await apolloClient.query<TResult, TVariables>({
      ...options,
      fetchPolicy: 'network-only',
    });
    return data;
  } catch (error: any) {
    // TODO - Better error handling
    throw new Error(error.message || 'GraphQL error');
  }
}

export default apolloClient;

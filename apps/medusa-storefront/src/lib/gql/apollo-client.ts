import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  OperationVariables,
} from '@apollo/client';
import { SetContextLink } from '@apollo/client/link/context';
import { getAuthHeaders } from '@lib/data/cookies';

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:4000/graphql',
});

const authLink = new SetContextLink(async ({ headers }) => {
  const authHeaders = await getAuthHeaders();

  return {
    headers: {
      ...headers,
      ...authHeaders,
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
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

export async function graphqlMutation<
  TResult,
  TVariables extends OperationVariables,
>(
  options: ApolloClient.MutateOptions<TResult, TVariables>
): Promise<TResult | undefined> {
  try {
    const { data } = await apolloClient.mutate<TResult, TVariables>({
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

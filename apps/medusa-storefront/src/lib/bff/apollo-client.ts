import { DocumentNode } from 'graphql';

import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_BFF_URL || 'http://localhost:4000/graphql',
  }),
  cache: new InMemoryCache(),

  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
});

export async function graphqlFetch(query: DocumentNode, variables?: any) {
  try {
    const { data } = await apolloClient.query({
      query,
      variables,
      fetchPolicy: 'network-only',
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'GraphQL error');
  }
}

export async function graphqlMutation(mutation: DocumentNode, variables?: any) {
  try {
    const { data } = await apolloClient.mutate({
      mutation,
      variables,
      fetchPolicy: 'network-only',
    });
    return data;
  } catch (error: any) {
    throw new Error(error.message || 'GraphQL error');
  }
}

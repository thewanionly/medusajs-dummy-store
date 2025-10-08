'use server';

import { GET_COLLECTIONS_QUERY, GET_COLLECTION_QUERY } from '@lib/gql';
import { graphqlFetch } from '@lib/gql/apollo-client';
import {
  GetCollectionQuery,
  GetCollectionQueryVariables,
  GetCollectionsQuery,
  GetCollectionsQueryVariables,
} from '@lib/gql/generated-types/graphql';

export const retrieveCollection = async (id: string) => {
  try {
    const data = await graphqlFetch<
      GetCollectionQuery,
      GetCollectionQueryVariables
    >({ query: GET_COLLECTION_QUERY, variables: { id } });

    return data?.collection || null;
  } catch (error) {
    console.error('Error fetching collection from BFF:', error);
    return null;
  }
};

export const listCollections = async (
  queryParams: Record<string, string> = {}
) => {
  try {
    const limit = parseInt(queryParams.limit || '100');
    const offset = parseInt(queryParams.offset || '0');

    const data = await graphqlFetch<
      GetCollectionsQuery,
      GetCollectionsQueryVariables
    >({
      query: GET_COLLECTIONS_QUERY,
      variables: { limit, offset },
    });

    return {
      collections: data?.collections,
      count: data?.collections?.length || 0,
    };
  } catch (error) {
    console.error('Error fetching collections from BFF:', error);
    return { collections: [], count: 0 };
  }
};

export const getCollectionByHandle = async (handle: string) => {
  try {
    const data = await graphqlFetch<
      GetCollectionsQuery,
      GetCollectionsQueryVariables
    >({
      query: GET_COLLECTIONS_QUERY,
      variables: { handle: [handle] },
    });

    const collections = data?.collections || [];
    return collections.length > 0 ? collections[0] : null;
  } catch (error) {
    console.error('Error fetching collection by handle from BFF:', error);
    return null;
  }
};

'use server';

import { GET_COLLECTIONS_QUERY, GET_COLLECTION_QUERY } from '@lib/bff';
import { graphqlFetch } from '@lib/bff/apollo-client';
import {
  GetCollectionQuery,
  GetCollectionsQuery,
} from '@lib/bff/generated-types/graphql';

export const retrieveCollection = async (
  id: string
): Promise<GetCollectionQuery['collection'] | null> => {
  try {
    const data: GetCollectionQuery = await graphqlFetch(GET_COLLECTION_QUERY, {
      id,
    });

    return data.collection || null;
  } catch (error) {
    console.error('Error fetching collection from BFF:', error);
    return null;
  }
};

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{
  collections: GetCollectionsQuery['collections'];
  count: number;
}> => {
  try {
    const limit = parseInt(queryParams.limit || '100');
    const offset = parseInt(queryParams.offset || '0');

    const data: GetCollectionsQuery = await graphqlFetch(
      GET_COLLECTIONS_QUERY,
      {
        limit,
        offset,
      }
    );

    return {
      collections: data.collections,
      count: data.collections?.length || 0,
    };
  } catch (error) {
    console.error('Error fetching collections from BFF:', error);
    return { collections: [], count: 0 };
  }
};

export const getCollectionByHandle = async (
  handle: string
): Promise<GetCollectionQuery['collection'] | null> => {
  try {
    const data: GetCollectionQuery = await graphqlFetch(GET_COLLECTION_QUERY, {
      handle,
    });

    return data.collection || null;
  } catch (error) {
    console.error('Error fetching collection by handle from BFF:', error);
    return null;
  }
};

'use server';

import { graphqlFetch } from '@lib/bff/apollo-client';
import {
  GET_COLLECTIONS_QUERY,
  GET_COLLECTION_QUERY,
} from '@lib/bff/graphql-queries';
import { HttpTypes } from '@medusajs/types';

export const retrieveCollection = async (id: string) => {
  try {
    const data = await graphqlFetch(GET_COLLECTION_QUERY, {
      id,
    });

    return data.collection;
  } catch (error) {
    console.error('Error fetching collection from BFF:', error);
    return null;
  }
};

export const listCollections = async (
  queryParams: Record<string, string> = {}
): Promise<{ collections: HttpTypes.StoreCollection[]; count: number }> => {
  try {
    const limit = parseInt(queryParams.limit || '100');
    const offset = parseInt(queryParams.offset || '0');

    const data = await graphqlFetch(GET_COLLECTIONS_QUERY, {
      limit,
      offset,
    });

    return {
      collections: data.collections,
      count: data.collections.length,
    };
  } catch (error) {
    console.error('Error fetching collections from BFF:', error);
    return { collections: [], count: 0 };
  }
};

export const getCollectionByHandle = async (
  handle: string
): Promise<HttpTypes.StoreCollection> => {
  try {
    const data = await graphqlFetch(GET_COLLECTION_QUERY, {
      handle,
      fields: '*products',
    });

    return data.collection;
  } catch (error) {
    console.error('Error fetching collection by handle from BFF:', error);
    return null;
  }
};

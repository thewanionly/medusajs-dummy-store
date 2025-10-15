import {
  LiteClient as SearchClient,
  liteClient as algoliasearch,
} from 'algoliasearch/lite';

import Medusa from '@medusajs/js-sdk';

import { SEARCH_PRODUCTS_QUERY, graphqlFetch } from './gql';

// Defaults to standard port for Medusa server
const DEFAULT_MEDUSA_BACKEND_URL = 'http://localhost:9000';

export const sdk = new Medusa({
  baseUrl:
    process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || DEFAULT_MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === 'development',
  publishableKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY,
});

const EMPTY_SEARCH_RESULTS = {
  results: [
    {
      hits: [],
      nbHits: 0,
      nbPages: 0,
      page: 0,
      hitsPerPage: 0,
      processingTimeMS: 0,
      query: '',
      params: '',
    },
  ],
};

export const searchClient: SearchClient = {
  ...algoliasearch(
    process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '',
    process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || ''
  ),
  search: async (params) => {
    const request = Array.isArray(params) ? params[0] : params;

    if (!request) return EMPTY_SEARCH_RESULTS;

    const query =
      'params' in request
        ? request.params?.query
        : 'query' in request
          ? request.query
          : '';

    if (!query) return EMPTY_SEARCH_RESULTS;

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = await graphqlFetch<any, any>({
        query: SEARCH_PRODUCTS_QUERY,
        variables: {
          query,
        },
      });

      return {
        results: data.search,
      };
    } catch (error) {
      console.error('Error fetching search results from BFF:', error);
      return {
        results: null,
      };
    }
  },
};

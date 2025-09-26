import { GET_PRODUCT_CATEGORIES_QUERY } from '@lib/bff';
import { graphqlFetch } from '@lib/bff/apollo-client';
import {
  GetProductCategoryDocument,
  GetProductCategoryQuery,
  GetProductCategoryQueryVariables,
} from '@lib/bff/generated-types/graphql';

export const listCategories = async () => {
  try {
    const data = await graphqlFetch<
      GetProductCategoryQuery,
      GetProductCategoryQueryVariables
    >({
      query: GET_PRODUCT_CATEGORIES_QUERY,
    });

    return data || [];
  } catch (error) {
    console.error('Error fetching categories from BFF:', error);
    return [];
  }
};

export const getCategoryByHandle = async () => {
  const handle = `categoryHandle.join('/')`;

  try {
    const data = await graphqlFetch<
      GetProductCategoryQuery,
      GetProductCategoryQueryVariables
    >({
      query: GetProductCategoryDocument,
      variables: {
        handle,
      },
    });

    return data?.productCategory || null;
  } catch (error) {
    console.error('Error fetching category by handle from BFF:', error);
    return null;
  }
};

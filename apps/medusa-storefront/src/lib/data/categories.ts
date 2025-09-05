import { graphqlFetch } from '@lib/bff/apollo-client';
import { GET_PRODUCT_CATEGORIES_QUERY } from '@lib/bff/graphql-queries';

export const listCategories = async (query?: Record<string, any>) => {
  const limit = query?.limit || 100;

  try {
    const data = await graphqlFetch(GET_PRODUCT_CATEGORIES_QUERY, {
      limit,
      fields:
        '*category_children, *products, *parent_category, *parent_category.parent_category',
      ...query,
    });

    return data.productCategories;
  } catch (error) {
    console.error('Error fetching categories from BFF:', error);
    return [];
  }
};

export const getCategoryByHandle = async () => {
  const handle = `categoryHandle.join('/')`;

  try {
    const data = await graphqlFetch(GET_PRODUCT_CATEGORIES_QUERY, {
      handle,
      fields: '*category_children, *products',
    });

    return data.productCategories[0];
  } catch (error) {
    console.error('Error fetching category by handle from BFF:', error);
    return null;
  }
};

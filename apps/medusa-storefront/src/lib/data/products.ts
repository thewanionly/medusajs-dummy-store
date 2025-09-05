'use server';

import { graphqlFetch } from '@lib/bff/apollo-client';
import { GET_PRODUCTS_QUERY } from '@lib/bff/graphql-queries';
import { sortProducts } from '@lib/util/sort-products';
import { HttpTypes } from '@medusajs/types';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';

import { getRegion, retrieveRegion } from './regions';

export const listProducts = async ({
  pageParam = 1,
  queryParams,
  countryCode,
  regionId,
}: {
  pageParam?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
  countryCode?: string;
  regionId?: string;
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
}> => {
  if (!countryCode && !regionId) {
    throw new Error('Country code or region ID is required');
  }

  const limit = queryParams?.limit || 12;
  const _pageParam = Math.max(pageParam, 1);
  const offset = _pageParam === 1 ? 0 : (_pageParam - 1) * limit;

  let region: HttpTypes.StoreRegion | undefined | null;

  if (countryCode) {
    region = await getRegion(countryCode);
  } else {
    region = await retrieveRegion(regionId!);
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }

  try {
    // Build filters for GraphQL (handle the type issue with any)
    const filters: any = {};
    const qParams = queryParams as any;

    if (qParams?.q) filters.q = qParams.q;
    if (qParams?.category_id)
      filters.category_id = Array.isArray(qParams.category_id)
        ? qParams.category_id
        : [qParams.category_id];
    if (qParams?.collection_id)
      filters.collection_id = Array.isArray(qParams.collection_id)
        ? qParams.collection_id
        : [qParams.collection_id];
    if (qParams?.tag_id)
      filters.tag_id = Array.isArray(qParams.tag_id)
        ? qParams.tag_id
        : [qParams.tag_id];
    if (qParams?.handle)
      filters.handle = Array.isArray(qParams.handle)
        ? qParams.handle
        : [qParams.handle];
    if (qParams?.status)
      filters.status = Array.isArray(qParams.status)
        ? qParams.status
        : [qParams.status];
    if (qParams?.id)
      filters.id = Array.isArray(qParams.id) ? qParams.id : [qParams.id];

    // GraphQL query to BFF
    const data = await graphqlFetch(GET_PRODUCTS_QUERY, {
      limit,
      offset,
      filters: Object.keys(filters).length > 0 ? filters : undefined,
      region_id: region?.id,
      fields:
        '*variants.calculated_price,+variants.inventory_quantity,+metadata,+tags',
    });

    const products = data.products.products;
    const count = data.products.count;
    const nextPage = count > offset + limit ? pageParam + 1 : null;

    return {
      response: {
        products,
        count,
      },
      nextPage: nextPage,
      queryParams,
    };
  } catch (error) {
    console.error('Error fetching products from BFF:', error);
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }
};

export const listProductsWithSort = async ({
  page = 0,
  queryParams,
  sortBy = 'created_at',
  countryCode,
}: {
  page?: number;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
  sortBy?: SortOptions;
  countryCode: string;
}): Promise<{
  response: { products: HttpTypes.StoreProduct[]; count: number };
  nextPage: number | null;
  queryParams?: HttpTypes.FindParams & HttpTypes.StoreProductParams;
}> => {
  const limit = queryParams?.limit || 12;

  const {
    response: { products, count },
  } = await listProducts({
    pageParam: 0,
    queryParams: {
      ...queryParams,
      limit: 100,
    },
    countryCode,
  });

  const sortedProducts = sortProducts(products, sortBy);

  const pageParam = (page - 1) * limit;

  const nextPage = count > pageParam + limit ? pageParam + limit : null;

  const paginatedProducts = sortedProducts.slice(pageParam, pageParam + limit);

  return {
    response: {
      products: paginatedProducts,
      count,
    },
    nextPage,
    queryParams,
  };
};

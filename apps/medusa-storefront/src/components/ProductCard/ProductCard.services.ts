import { sdk } from '@lib/config';
import { GET_PRODUCTS_QUERY, graphqlFetch } from '@lib/gql';
import {
  GetProductsQuery,
  GetProductsQueryVariables,
} from '@lib/gql/generated-types/graphql';
import medusaError from '@lib/util/medusa-error';
import { HttpTypes } from '@medusajs/types';

export const listRegions = async () => {
  return sdk.client
    .fetch<{ regions: HttpTypes.StoreRegion[] }>(`/store/regions`, {
      method: 'GET',
      cache: 'force-cache',
    })
    .then(({ regions }) => regions)
    .catch(medusaError);
};

const regionMap = new Map<string, HttpTypes.StoreRegion>();

export const getRegion = async (countryCode: string) => {
  try {
    if (regionMap.has(countryCode)) {
      return regionMap.get(countryCode);
    }

    const regions = await listRegions();

    if (!regions) {
      return null;
    }

    regions.forEach((region) => {
      region.countries?.forEach((c) => {
        regionMap.set(c?.iso_2 ?? '', region);
      });
    });

    const region = countryCode
      ? regionMap.get(countryCode)
      : regionMap.get('us');

    return region;
  } catch (e: any) {
    return null;
  }
};

export const listProducts = async ({
  countryCode,
  queryParams,
}: {
  countryCode: string;
  pageParam?: number;
  queryParams?: GetProductsQueryVariables;
}): Promise<{
  response: {
    products: GetProductsQuery['products']['products'] | [];
    count: number;
  };
  nextPage: number | null;
  queryParams?: GetProductsQueryVariables;
}> => {
  if (!countryCode) {
    throw new Error('Country code or region ID is required');
  }

  let region: HttpTypes.StoreRegion | undefined | null;

  if (countryCode) {
    region = await getRegion(countryCode);
  }

  if (!region) {
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }

  const variables: GetProductsQueryVariables = {
    region_id: region.id,
    ...queryParams,
  };

  try {
    const data = await graphqlFetch<
      GetProductsQuery,
      GetProductsQueryVariables
    >({
      query: GET_PRODUCTS_QUERY,
      variables,
    });

    return {
      response: {
        products: data?.products?.products ?? [],
        count: data?.products?.count || 0,
      },
      nextPage: null,
    };
  } catch (error) {
    console.error('Error fetching products from BFF:', error);
    return {
      response: { products: [], count: 0 },
      nextPage: null,
    };
  }
};

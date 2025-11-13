'use server';

import { sdk } from '@lib/config';
import { Region } from '@lib/gql/generated-types/graphql';
import medusaError from '@lib/util/medusa-error';

import { getCacheOptions } from './cookies';

export const listRegions = async () => {
  const next = {
    ...(await getCacheOptions('regions')),
  };

  return sdk.client
    .fetch<{ regions: Region[] }>(`/store/regions`, {
      method: 'GET',
      next,
      cache: 'force-cache',
    })
    .then(({ regions }) => regions)
    .catch(medusaError);
};

export const retrieveRegion = async (id: string) => {
  const next = {
    ...(await getCacheOptions(['regions', id].join('-'))),
  };

  return sdk.client
    .fetch<{ region: Region }>(`/store/regions/${id}`, {
      method: 'GET',
      next,
      cache: 'force-cache',
    })
    .then(({ region }) => region)
    .catch(medusaError);
};

const regionMap = new Map<string, Region>();

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
        regionMap.set(c?.iso2 ?? '', region);
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

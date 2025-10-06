import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { listProducts } from '@lib/data/products';
import { getRegion, listRegions } from '@lib/data/regions';
import ProductTemplate from '@modules/products/templates';

export type Props = {
  params: { countryCode: string; handle: string };
};

export interface StaticParam {
  countryCode: string;
  handle: string;
}

export async function generateStaticParams(): Promise<StaticParam[]> {
  try {
    const regions = await listRegions();
    const countryCodes = regions
      ?.flatMap((r) => r.countries?.map((c) => c.iso_2) || [])
      .filter(Boolean) as string[] | undefined;

    if (!countryCodes || countryCodes.length === 0) {
      return [];
    }

    const countryProducts = await Promise.all(
      countryCodes.map(async (country) => {
        const { response } = await listProducts({
          countryCode: country,
          queryParams: { limit: 100 },
        });
        return {
          country,
          products: response.products || [],
        };
      })
    );

    return countryProducts
      .flatMap((countryData) =>
        (countryData.products || [])
          .filter((p): p is NonNullable<typeof p> => Boolean(p && p.handle))
          .map((product) => ({
            countryCode: countryData.country,
            handle: product.handle,
          }))
      )
      .filter((param): param is StaticParam => Boolean(param.handle));
  } catch (error) {
    console.error(
      `Failed to generate static paths for product pages: ${
        error instanceof Error ? error.message : 'Unknown error'
      }.`
    );
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle, countryCode } = params;
  const region = await getRegion(countryCode);

  if (!region) {
    notFound();
  }

  const product = await listProducts({
    countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products?.[0]);

  if (!product) {
    notFound();
  }

  return {
    title: `${product.title} | Medusa Store`,
    description: `${product.title}`,
    openGraph: {
      title: `${product.title} | Medusa Store`,
      description: `${product.title}`,
      images: product.thumbnail ? [product.thumbnail] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { countryCode, handle } = params;
  const region = await getRegion(countryCode);

  if (!region) {
    notFound();
  }

  const pricedProduct = await listProducts({
    countryCode,
    queryParams: { handle },
  }).then(({ response }) => response.products?.[0]);

  if (!pricedProduct) {
    notFound();
  }

  return (
    <ProductTemplate
      product={pricedProduct}
      region={region}
      countryCode={countryCode}
    />
  );
}

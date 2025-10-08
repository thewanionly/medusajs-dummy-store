import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { listProducts } from '@lib/data/products';
import { getRegion } from '@lib/data/regions';
import { Product } from '@lib/gql/generated-types/graphql';
import ProductTemplate from '@modules/products/templates';

export type Props = {
  params: { countryCode: string; handle: string };
};

export interface StaticParam {
  countryCode: string;
  handle: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle, countryCode } = await params;
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
  const { countryCode, handle } = await params;
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
      product={pricedProduct as Product}
      region={region}
      countryCode={countryCode}
    />
  );
}

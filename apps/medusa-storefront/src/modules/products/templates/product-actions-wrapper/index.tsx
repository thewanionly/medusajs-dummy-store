import { listProducts } from '@lib/data/products';
import { Product, Region } from '@lib/gql/generated-types/graphql';
import ProductActions from '@modules/products/components/product-actions';

/**
 * Fetches real time pricing for a product and renders the product actions component.
 */
export default async function ProductActionsWrapper({
  id,
  region,
}: {
  id: string;
  region: Region;
}) {
  const product = await listProducts({
    queryParams: { id: [id] },
    regionId: region.id,
  }).then(({ response }) => response.products?.[0] ?? null);

  if (!product) {
    return null;
  }

  return <ProductActions product={product as Product} />;
}

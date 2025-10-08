import { Collection } from '@lib/gql/generated-types/graphql';
import { HttpTypes } from '@medusajs/types';
import ProductRail from '@modules/home/components/featured-products/product-rail';

export default async function FeaturedProducts({
  collections,
  region,
}: {
  collections: Collection[];
  region: HttpTypes.StoreRegion;
}) {
  return collections.map((collection) => (
    <li key={collection.id}>
      <ProductRail collection={collection} region={region} />
    </li>
  ));
}

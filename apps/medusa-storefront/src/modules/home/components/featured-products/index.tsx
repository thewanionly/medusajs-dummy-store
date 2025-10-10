import { Collection } from '@lib/gql/generated-types/graphql';
import ProductRail from '@modules/home/components/featured-products/product-rail';

export default async function FeaturedProducts({
  collections,
}: {
  collections: Collection[];
}) {
  return collections.map((collection) => (
    <li key={collection.id}>
      <ProductRail collection={collection} />
    </li>
  ));
}

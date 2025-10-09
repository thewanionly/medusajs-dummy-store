import { Collection, Product } from '@lib/gql/generated-types/graphql';
import { Text } from '@medusajs/ui';
import InteractiveLink from '@modules/common/components/interactive-link';
import ProductPreview from '@modules/products/components/product-preview';

export default async function ProductRail({
  collection,
}: {
  collection: Collection;
}) {
  if (!collection.products || collection.products.count === 0) {
    return null;
  }

  return (
    <div className="content-container py-12 small:py-24">
      <div className="mb-8 flex justify-between">
        <Text className="txt-xlarge">{collection.title}</Text>
        <InteractiveLink href={`/collections/${collection.handle}`}>
          View all
        </InteractiveLink>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-24 small:grid-cols-3 small:gap-y-36">
        {collection.products.items &&
          collection.products.items.map((product) => (
            <li key={product?.id}>
              <ProductPreview product={product as Product} isFeatured />
            </li>
          ))}
      </ul>
    </div>
  );
}

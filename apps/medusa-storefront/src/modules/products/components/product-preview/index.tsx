import { Product } from '@lib/gql/generated-types/graphql';
import { getProductPrice } from '@lib/util/get-product-price';
import { Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';

import Thumbnail from '../thumbnail';
import PreviewPrice from './price';

export type ProductPreviewProps = {
  product: Product;
  isFeatured?: boolean;
};

export default function ProductPreview({
  product,
  isFeatured,
}: ProductPreviewProps) {
  const { cheapestPrice } = getProductPrice({
    product,
  });

  return (
    <LocalizedClientLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="txt-compact-medium mt-4 flex justify-between">
          <Text className="text-ui-fg-subtle" data-testid="product-title">
            {product.title}
          </Text>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedClientLink>
  );
}

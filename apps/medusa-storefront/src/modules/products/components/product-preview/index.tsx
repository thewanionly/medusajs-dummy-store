import { Product } from '@lib/gql/generated-types/graphql';
import { getProductPrice } from '@lib/util/get-product-price';
import { Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import WishlistToggleButton from '@modules/wishlist/components/wishlist-toggle';

import Thumbnail from '../thumbnail';
import PreviewPrice from './price';

const WRAPPER_FOCUS_CLASSES =
  'block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ui-bg-interactive focus-visible:ring-offset-2';

export type ProductPreviewProps = {
  product: Product;
  isFeatured?: boolean;
  showWishlistToggle?: boolean;
  disableLink?: boolean;
};

export default function ProductPreview({
  product,
  isFeatured,
  showWishlistToggle = false,
  disableLink = false,
}: ProductPreviewProps) {
  const { cheapestPrice } = getProductPrice({
    product,
  });
  const defaultVariant = product?.variants?.[0];
  const previewContent = (
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
  );

  return (
    <div className="group relative">
      {showWishlistToggle && defaultVariant?.id && (
        <div className="absolute right-3 top-3 z-10">
          <WishlistToggleButton
            productTitle={product.title}
            productVariantId={defaultVariant.id}
          />
        </div>
      )}
      {disableLink ? (
        <div className={WRAPPER_FOCUS_CLASSES}>{previewContent}</div>
      ) : (
        <LocalizedClientLink
          href={`/products/${product.handle}`}
          className={WRAPPER_FOCUS_CLASSES}
        >
          {previewContent}
        </LocalizedClientLink>
      )}
    </div>
  );
}

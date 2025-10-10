import { Product, ProductVariant } from '@lib/gql/generated-types/graphql';
import { getProductPrice } from '@lib/util/get-product-price';
import { clx } from '@medusajs/ui';

export default function ProductPrice({
  product,
  variant,
}: {
  product: Product;
  variant?: ProductVariant;
}) {
  const { cheapestPrice, variantPrice } = getProductPrice({
    product,
    variantId: variant?.id,
  });

  const selectedPrice = variant ? variantPrice : cheapestPrice;

  if (!selectedPrice) {
    return <div className="block h-9 w-32 animate-pulse bg-gray-100" />;
  }

  return (
    <div className="flex flex-col text-ui-fg-base">
      <span
        className={clx('text-xl-semi', {
          'text-ui-fg-interactive': selectedPrice.price_type === 'sale',
        })}
      >
        {!variant && 'From '}
        <span
          data-testid="product-price"
          data-value={selectedPrice.calculated_price_number}
        >
          {selectedPrice.calculated_price}
        </span>
      </span>
      {selectedPrice.price_type === 'sale' && (
        <>
          <p>
            <span className="text-ui-fg-subtle">Original: </span>
            <span
              className="line-through"
              data-testid="original-product-price"
              data-value={selectedPrice.original_price_number}
            >
              {selectedPrice.original_price}
            </span>
          </p>
          <span className="text-ui-fg-interactive">
            -{selectedPrice.percentage_diff}%
          </span>
        </>
      )}
    </div>
  );
}

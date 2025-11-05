import { LineItem } from '@lib/gql/generated-types/graphql';
import { convertToLocale } from '@lib/util/money';
import { HttpTypes } from '@medusajs/types';
import { clx } from '@medusajs/ui';

type LineItemUnitPriceProps = {
  item: HttpTypes.StoreCartLineItem | HttpTypes.StoreOrderLineItem | LineItem;
  style?: 'default' | 'tight';
  currencyCode: string;
};

const LineItemUnitPrice = ({
  item,
  style = 'default',
  currencyCode,
}: LineItemUnitPriceProps) => {
  const total = item.total ?? 0;
  const original_total = item.original_total ?? 0;
  const quantity = item.quantity ?? 0;

  const hasReducedPrice = total < original_total;

  const percentage_diff =
    original_total > 0
      ? Math.round(((original_total - total) / original_total) * 100)
      : 0;

  return (
    <div className="flex h-full flex-col justify-center text-ui-fg-muted">
      {hasReducedPrice && (
        <>
          <p>
            {style === 'default' && (
              <span className="text-ui-fg-muted">Original: </span>
            )}
            <span
              className="line-through"
              data-testid="product-unit-original-price"
            >
              {convertToLocale({
                amount: original_total / item.quantity,
                currency_code: currencyCode,
              })}
            </span>
          </p>
          {style === 'default' && (
            <span className="text-ui-fg-interactive">-{percentage_diff}%</span>
          )}
        </>
      )}
      <span
        className={clx('text-base-regular', {
          'text-ui-fg-interactive': hasReducedPrice,
        })}
        data-testid="product-unit-price"
      >
        {convertToLocale({
          amount: total / quantity,
          currency_code: currencyCode,
        })}
      </span>
    </div>
  );
};

export default LineItemUnitPrice;

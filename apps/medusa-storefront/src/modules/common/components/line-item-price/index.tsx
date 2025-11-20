import { LineItem } from '@lib/gql/generated-types/graphql';
import { getPercentageDiff } from '@lib/util/get-precentage-diff';
import { convertToLocale } from '@lib/util/money';
import { clx } from '@medusajs/ui';

type LineItemPriceProps = {
  item: LineItem;
  style?: 'default' | 'tight';
  currencyCode: string;
};

const LineItemPrice = ({
  item,
  style = 'default',
  currencyCode,
}: LineItemPriceProps) => {
  const { total, originalTotal } = item;
  const originalPrice = originalTotal;
  const currentPrice = total;
  const hasReducedPrice =
    currentPrice && originalPrice && currentPrice < originalPrice;

  return (
    <div className="flex flex-col items-end gap-x-2 text-ui-fg-subtle">
      <div className="text-left">
        {hasReducedPrice && (
          <>
            <p>
              {style === 'default' && (
                <span className="text-ui-fg-subtle">Original: </span>
              )}
              <span
                className="text-ui-fg-muted line-through"
                data-testid="product-original-price"
              >
                {convertToLocale({
                  amount: originalPrice,
                  currency_code: currencyCode,
                })}
              </span>
            </p>
            {style === 'default' && (
              <span className="text-ui-fg-interactive">
                -{getPercentageDiff(originalPrice, currentPrice || 0)}%
              </span>
            )}
          </>
        )}
        <span
          className={clx('text-base-regular', {
            'text-ui-fg-interactive': hasReducedPrice,
          })}
          data-testid="product-price"
        >
          {convertToLocale({
            amount: currentPrice ?? 0,
            currency_code: currencyCode,
          })}
        </span>
      </div>
    </div>
  );
};

export default LineItemPrice;

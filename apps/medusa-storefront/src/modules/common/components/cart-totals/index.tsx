'use client';

import React from 'react';

import { convertToLocale } from '@lib/util/money';

type CartTotalsProps = {
  totals: {
    total?: number | null;
    subtotal?: number | null;
    taxTotal?: number | null;
    shippingTotal?: number | null;
    discountTotal?: number | null;
    giftCardTotal?: number | null;
    currencyCode: string;
    shippingSubtotal?: number | null;
  };
};

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currencyCode,
    total,
    subtotal,
    taxTotal,
    discountTotal,
    giftCardTotal,
    shippingSubtotal,
  } = totals;

  const shipping_excluded = (subtotal ?? 0) - (shippingSubtotal ?? 0);

  return (
    <div>
      <div className="txt-medium flex flex-col gap-y-2 text-ui-fg-subtle">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-x-1">
            Subtotal (excl. shipping and taxes)
          </span>
          <span data-testid="cart-subtotal" data-value={shipping_excluded}>
            {convertToLocale({
              amount: shipping_excluded,
              currency_code: currencyCode,
            })}
          </span>
        </div>
        {!!discountTotal && (
          <div className="flex items-center justify-between">
            <span>Discount</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-discount"
              data-value={discountTotal || 0}
            >
              -{' '}
              {convertToLocale({
                amount: discountTotal ?? 0,
                currency_code: currencyCode,
              })}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between">
          <span>Shipping</span>
          <span data-testid="cart-shipping" data-value={shippingSubtotal || 0}>
            {convertToLocale({
              amount: shippingSubtotal ?? 0,
              currency_code: currencyCode,
            })}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-x-1">Taxes</span>
          <span data-testid="cart-taxes" data-value={taxTotal || 0}>
            {convertToLocale({
              amount: taxTotal ?? 0,
              currency_code: currencyCode,
            })}
          </span>
        </div>
        {!!giftCardTotal && (
          <div className="flex items-center justify-between">
            <span>Gift card</span>
            <span
              className="text-ui-fg-interactive"
              data-testid="cart-gift-card-amount"
              data-value={giftCardTotal || 0}
            >
              -{' '}
              {convertToLocale({
                amount: giftCardTotal ?? 0,
                currency_code: currencyCode,
              })}
            </span>
          </div>
        )}
      </div>
      <div className="my-4 h-px w-full border-b border-gray-200" />
      <div className="txt-medium mb-2 flex items-center justify-between text-ui-fg-base">
        <span>Total</span>
        <span
          className="txt-xlarge-plus"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code: currencyCode })}
        </span>
      </div>
      <div className="mt-4 h-px w-full border-b border-gray-200" />
    </div>
  );
};

export default CartTotals;

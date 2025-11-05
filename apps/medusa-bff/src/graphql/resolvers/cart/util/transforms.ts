import {
  StoreCart,
  StoreCompleteCartResponse,
  StorePaymentCollection,
} from '@medusajs/types';

const normalizeInt = (v: number | null | undefined): number => v ?? 0;

export function normalizeCompleteCartResponse(
  response: StoreCompleteCartResponse
): StoreCompleteCartResponse {
  if (response.type === 'order') {
    return {
      type: 'order',
      order: response.order,
    };
  }

  if (response.type === 'cart') {
    if (!response.cart) {
      throw new Error(
        'Expected cart to be defined for CompleteCartResponse of type "cart"'
      );
    }

    return {
      type: 'cart',
      cart: normalizeCart(response.cart),
      error: {
        message: response.error?.message ?? '',
        name: response.error?.name ?? '',
        type: response.error?.type ?? '',
      },
    };
  }

  throw new Error('Unexpected CompleteCartResponse type');
}

export function normalizePaymentCollection(
  collection: StorePaymentCollection | null | undefined
): StorePaymentCollection | undefined {
  if (!collection) return;

  return {
    id: collection.id ?? '',
    amount: normalizeInt(collection.amount),
    currency_code: collection.currency_code ?? '',
    payment_providers: collection.payment_providers ?? [],
    payment_sessions:
      collection.payment_sessions?.map((s) => ({
        amount: s.amount ?? 0,
        currency_code: s.currency_code ?? 'eur',
        id: s.id ?? '',
        provider_id: s.provider_id ?? '',
        status: s.status ?? '',
        data: s.data ?? {},
      })) ?? [],
    created_at: collection.created_at,
    updated_at: collection.updated_at,
    status: collection.status ?? 'not_paid',
  };
}

export function normalizeCart(cart: StoreCart): StoreCart {
  return {
    id: cart.id,
    currency_code: cart.currency_code ?? '',

    original_item_total: normalizeInt(cart.original_item_total),
    original_item_subtotal: normalizeInt(cart.original_item_subtotal),
    original_item_tax_total: normalizeInt(cart.original_item_tax_total),
    item_total: normalizeInt(cart.item_total),
    item_subtotal: normalizeInt(cart.item_subtotal),
    item_tax_total: normalizeInt(cart.item_tax_total),

    original_total: normalizeInt(cart.original_total),
    original_subtotal: normalizeInt(cart.original_subtotal),
    original_tax_total: normalizeInt(cart.original_tax_total),
    total: normalizeInt(cart.total),
    subtotal: normalizeInt(cart.subtotal),
    tax_total: normalizeInt(cart.tax_total),
    discount_total: normalizeInt(cart.discount_total),
    discount_tax_total: normalizeInt(cart.discount_tax_total),
    shipping_total: normalizeInt(cart.shipping_total),
    shipping_subtotal: normalizeInt(cart.shipping_subtotal),
    shipping_tax_total: normalizeInt(cart.shipping_tax_total),
    original_shipping_total: normalizeInt(cart.original_shipping_total),
    original_shipping_subtotal: normalizeInt(cart.original_shipping_subtotal),
    original_shipping_tax_total: normalizeInt(cart.original_shipping_tax_total),
    gift_card_total: normalizeInt(cart.gift_card_total),
    gift_card_tax_total: normalizeInt(cart.gift_card_tax_total),

    promotions: cart.promotions ?? [],
    email: cart.email ?? '',
    items: cart.items ?? [],
    region_id: cart.region_id ?? '',
    shipping_address: cart.shipping_address,
    billing_address: cart.billing_address,
    created_at: cart.created_at,
    updated_at: cart.updated_at,
    shipping_methods: (cart.shipping_methods ?? []).map((sm) => ({
      id: sm.id ?? '',
      cart_id: sm.cart_id ?? cart.id ?? '',
      name: sm.name ?? '',
      amount: sm.amount ?? 0,
      is_tax_inclusive: sm.is_tax_inclusive ?? false,
      created_at: sm.created_at,
      updated_at: sm.updated_at,
      shipping_option_id: sm.shipping_option_id,
    })),
    region: cart.region,
    payment_collection: normalizePaymentCollection(cart.payment_collection),
    customer_id: cart.customer_id ?? '',
  };
}

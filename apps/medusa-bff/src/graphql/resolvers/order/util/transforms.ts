import { Order } from '@graphql/generated/graphql';
import { normalizeLineItems } from '@graphql/resolvers/cart/util/transforms';
import { HttpTypes } from '@medusajs/types';

const toISO = (d: string | Date | undefined) =>
  d instanceof Date ? d.toISOString() : (d ?? '');

export function normalizeOrder(order: HttpTypes.StoreOrder): Order {
  return {
    id: order.id,
    displayId: order.display_id,
    email: order.email ?? '',
    customerId: order.customer_id ?? '',
    regionId: order.region_id ?? '',
    salesChannelId: order.sales_channel_id ?? '',
    paymentStatus: order.payment_status ?? '',
    fulfillmentStatus: order.fulfillment_status ?? '',
    total: order.total ?? 0,
    subtotal: order.subtotal ?? 0,
    discountTotal: order.discount_total ?? 0,
    giftCardTotal: order.gift_card_total ?? 0,
    taxTotal: order.tax_total ?? 0,
    shippingTotal: order.shipping_total ?? 0,
    currencyCode: order.currency_code ?? 'usd',
    status: order.status ?? '',
    createdAt: toISO(order.created_at),
    updatedAt: toISO(order.updated_at),
    items: normalizeLineItems(order?.items ?? []),
    shippingMethods: (order.shipping_methods ?? []).map((sm) => ({
      id: sm.id ?? '',
      name: sm.name ?? '',
      amount: sm.amount ?? 0,
      isTaxInclusive: sm.is_tax_inclusive ?? false,
      createdAt: toISO(sm.created_at),
      updatedAt: toISO(sm.updated_at),
      shippingOptionId: sm.shipping_option_id,
    })),
    shippingAddress: order.shipping_address
      ? {
          firstName: order.shipping_address.first_name,
          lastName: order.shipping_address.last_name,
          address1: order.shipping_address.address_1,
          address2: order.shipping_address.address_2,
          city: order.shipping_address.city,
          postalCode: order.shipping_address.postal_code,
          phone: order.shipping_address.phone,
        }
      : null,
  };
}

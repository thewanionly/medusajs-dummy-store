import { StoreCart } from '@medusajs/types';

export const createMockCart = () => {
  const defaultCart = {
    id: 'cart_123',
    region_id: 'reg_123',
    customer_id: 'cust_123',
    email: 'customer@example.com',
    currency_code: 'usd',
    shipping_address: undefined,
    billing_address: undefined,

    item_subtotal: 2000,
    item_total: 2000,
    item_tax_total: 0,
    subtotal: 2000,
    shipping_total: 0,
    shipping_subtotal: 0,
    shipping_tax_total: 0,
    gift_card_tax_total: 0,
    tax_total: 0,
    total: 2000,
    discount_total: 0,
    gift_card_total: 0,
    original_item_total: 2000,
    original_item_subtotal: 2000,
    original_item_tax_total: 0,
    original_shipping_total: 0,
    original_total: 2000,
    original_subtotal: 2000,
    original_tax_total: 0,
    original_shipping_subtotal: 0,
    original_shipping_tax_total: 0,
    discount_tax_total: 0,

    promotions: [],
    region: {
      id: 'reg_123',
      name: 'US Region',
      currency_code: 'usd',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      countries: [],
    },

    items: [
      {
        id: 'item_1',
        title: 'Mock Product',
        quantity: 2,
        unit_price: 1000,
        variant_id: 'variant_123',
        cart_id: 'cart_123',
        cart: {} as StoreCart,
        requires_shipping: true,
        is_discountable: true,
        is_tax_inclusive: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        metadata: {},
      },
    ],

    shipping_methods: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    metadata: {},
  };

  return { ...(defaultCart as unknown as StoreCart) };
};

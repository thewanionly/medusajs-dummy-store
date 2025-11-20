import type { Product, ProductVariant } from '@graphql/generated/graphql';
import type { HttpTypes } from '@medusajs/types';

import { formatProductData } from '@services/medusa/product/util/formatProductData';

type StoreWishlistItem = {
  id: string;
  wishlist_id: string;
  product_variant_id: string;
  product_variant?: HttpTypes.StoreProductVariant | null;
};

export type StoreWishlist = {
  id: string;
  items?: (StoreWishlistItem | null)[] | null;
};

export type WishlistApiResponse = {
  wishlist: StoreWishlist;
};

export const hasCompleteProductData = (
  product?: HttpTypes.StoreProductVariant['product'] | null
) => Boolean(product?.title);

export type WishlistGraphQL = {
  id: string;
  items: WishlistItemGraphQL[];
};

export type WishlistItemGraphQL = {
  id: string;
  wishlistId: string;
  productVariantId: string;
  productVariant?: WishlistProductVariant;
};

type WishlistProductVariant = ProductVariant & {
  product?: Product | null;
};

type TransformOptions = {
  productsById?: Record<string, Product | null | undefined>;
};

export const transformWishlist = (
  wishlist: StoreWishlist,
  options: TransformOptions = {}
): WishlistGraphQL => ({
  id: wishlist.id,
  items:
    wishlist.items
      ?.filter((item): item is StoreWishlistItem => Boolean(item))
      .map((item) => transformWishlistItem(item, options.productsById)) ?? [],
});

const transformWishlistItem = (
  item: StoreWishlistItem,
  productsById?: TransformOptions['productsById']
): WishlistItemGraphQL => ({
  id: item.id,
  wishlistId: item.wishlist_id,
  productVariantId: item.product_variant_id,
  productVariant: item.product_variant
    ? transformProductVariant(item.product_variant, productsById)
    : undefined,
});

const transformProductVariant = (
  variant: HttpTypes.StoreProductVariant,
  productsById?: TransformOptions['productsById']
): WishlistProductVariant => {
  const {
    id,
    sku,
    allow_backorder,
    manage_inventory,
    inventory_quantity,
    options,
    calculated_price,
    product,
    product_id,
  } = variant;

  const graphqlVariant: WishlistProductVariant = {
    id,
    sku: sku ?? undefined,
    allowBackorder: Boolean(allow_backorder),
    manageInventory: Boolean(manage_inventory),
    inventoryQuantity: inventory_quantity ?? undefined,
    options:
      options?.map(({ id, option_id, value }) => ({
        id,
        optionId: option_id || '',
        value,
      })) ?? [],
    product: resolveProduct(product, product_id, productsById),
    ...buildPrice(calculated_price),
  };

  return graphqlVariant;
};

const resolveProduct = (
  product: HttpTypes.StoreProductVariant['product'],
  productId?: string | null,
  productsById?: TransformOptions['productsById']
) => {
  if (product && hasCompleteProductData(product)) {
    return formatProductData(product) ?? undefined;
  }

  if (!productId || !productsById) {
    return undefined;
  }

  return productsById[productId] ?? undefined;
};

const buildPrice = (
  calculatedPrice?: HttpTypes.StoreProductVariant['calculated_price']
): Partial<Pick<WishlistProductVariant, 'price' | 'originalPrice'>> => {
  if (!calculatedPrice) {
    return {};
  }

  const { currency_code, calculated_amount, original_amount } =
    calculatedPrice;

  return {
    price: {
      currencyCode: currency_code,
      amount: calculated_amount,
      priceType:
        calculatedPrice.calculated_price?.price_list_type || 'default',
    },
    originalPrice: {
      currencyCode: currency_code,
      amount: original_amount,
      priceType:
        calculatedPrice.original_price?.price_list_type || 'default',
    },
  };
};

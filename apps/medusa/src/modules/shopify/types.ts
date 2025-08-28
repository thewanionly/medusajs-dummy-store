/**
 * Represents a single product option, such as "Size" or "Color".
 */
export interface ShopifyProductOption {
  name: string;
  position: number;
  values: string[];
}

/**
 * Represents a single product image.
 */
export interface ShopifyProductImage {
  id: number;
  product_id: number;
  position: number;
  created_at: string; // ISO 8601 date-time string
  updated_at: string; // ISO 8601 date-time string
  alt: string | null;
  width: number;
  height: number;
  src: string;
  variant_ids: number[];
}

/**
 * Represents a specific variant of a product.
 * Each product has at least one variant.
 */
export interface ShopifyProductVariant {
  id: number;
  title: string; // e.g., "Small / Red"
  // Corresponds to the values in ShopifyProductOption
  option1: string | null;
  option2: string | null;
  option3: string | null;
  sku: string | null;
  requires_shipping: boolean;
  taxable: boolean;
  featured_image: ShopifyProductImage;
  available: boolean;
  // Note: Prices are returned as strings from the API.
  price: string;
  grams: number;
  compare_at_price: string | null;
  position: number;
  product_id: number;

  created_at: string; // ISO 8601 date-time string
  updated_at: string; // ISO 8601 date-time string
}

/**
 * Represents the main Shopify Product object, based on the Admin REST API.
 * @see https://shopify.dev/docs/api/admin-rest/2023-10/resources/product
 */
export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string; // The URL-friendly unique handle for the product.
  body_html: string;
  published_at: string | null; // ISO 8601 date-time string
  created_at: string; // ISO 8601 date-time string
  updated_at: string; // ISO 8601 date-time string
  vendor: string;
  product_type: string;
  tags: string[];

  // Nested resource arrays
  variants: ShopifyProductVariant[];
  images: ShopifyProductImage[];
  options: ShopifyProductOption[];
}

export type ShopifyPagination = {
  page: number;
  limit: number;
};

export type ShopifyPaginatedResponse<TData> = {
  products: TData[];
};

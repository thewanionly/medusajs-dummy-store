export interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string | null;
  thumbnail?: string | null;
  width?: number | null;
  weight?: number | null;
  length?: number | null;
  height?: number | null;
  originCountry?: string | null;
  material?: string | null;
  images?: ProductImage[] | null;
  tags?: ProductTag[] | null;
  options?: ProductOption[];
  variants?: ProductVariant[] | null;
  collection?: Collection | null;
  type?: string | null;
  collectionId?: string | null;
  createdAt: string | null;
}

export interface ProductImage {
  id: string;
  url: string;
}

export interface ProductTag {
  id: string;
}

export interface ProductOption {
  id: string;
  title: string;
  values: ProductOptionValue[];
}

export interface ProductOptionValue {
  id: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  sku?: string | null;
  inventoryQuantity?: number | null;
  allowBackorder: boolean | null;
  manageInventory: boolean | null;
  options?: ProductVariantOption[] | null;
  price?: Price | null;
  originalPrice?: Price | null;
}

export interface ProductVariantOption {
  id: string;
  value: string;
}

export interface Price {
  amount?: number | null;
  currencyCode?: string | null;
  priceType: string;
}

export interface Collection {
  id: string;
  title?: string | null;
  handle?: string | null;
}

export type ProductCategory = {
  id: string;
  name: string;
  description?: string;
  handle: string;
  parent_category_id?: string | null;
  rank?: number;
  metadata?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

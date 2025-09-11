import type { HttpTypes } from '@medusajs/types';

export type Product = HttpTypes.StoreProduct;

export type ProductTag = {
  id: string;
  value: string;
};

export type ProductImage = {
  id: string;
  url: string;
  rank?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export type ProductVariantOption = {
  id: string;
  option_id: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title?: string;
  sku?: string;
  barcode?: string | null;
  ean?: string | null;
  upc?: string | null;
  allow_backorder?: boolean;
  manage_inventory?: boolean;
  hs_code?: string | null;
  origin_country?: string;
  mid_code?: string | null;
  material?: string;
  weight?: number;
  length?: number;
  height?: number;
  width?: number;
  options?: ProductVariantOption[];
  inventory_quantity?: number;
  product_id: string;
  variant_rank?: number;
  metadata?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export type ProductOptionValue = {
  id: string;
  value: string;
};

export type ProductOption = {
  id: string;
  title: string;
  values?: ProductOptionValue[];
};

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

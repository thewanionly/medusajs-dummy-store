export type ShopifyCollection = {
  id: number;
  title: string;
  handle: string;
  description?: string;
  image?: ShopifyImage;
  products?: ShopifyProduct[];
};

export type ShopifyProduct = {
  id: number;
  title: string;
  handle: string;
  bodyHtml: string;
  vendor: string;
  productType: string;
  tags: string[];
  variants: ShopifyVariant[];
  images: ShopifyImage[];
  options: ShopifyOption[];
};

export type ShopifyVariant = {
  id: number;
  title: string;
  option1: string;
  option2: string;
  option3: string;
  sku: string;
  requiresShipping: boolean;
  taxable: boolean;
  featuredImage: ShopifyImage;
  available: boolean;
  price: string;
  grams: number;
  compareAtPrice: string;
  position: number;
  productId: number;
};

export type ShopifyImage = {
  id: number;
  position: number;
  alt: string;
  productId: number; // Reference to product
  variantIds: number[];
  src: string;
  width: number;
  height: number;
};

export type ShopifyOption = {
  name: string;
  position: number;
  values: string[];
};

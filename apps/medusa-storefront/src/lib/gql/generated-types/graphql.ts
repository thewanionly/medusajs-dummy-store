import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type Address = {
  __typename?: 'Address';
  address_1?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  country_code?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  postal_code?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  address_1?: InputMaybe<Scalars['String']['input']>;
  address_2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  country_code?: InputMaybe<Scalars['String']['input']>;
  customer_id?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postal_code?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
};

export type Cart = {
  __typename?: 'Cart';
  billing_address?: Maybe<Address>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  currency_code: Scalars['String']['output'];
  discount_tax_total?: Maybe<Scalars['Int']['output']>;
  discount_total?: Maybe<Scalars['Int']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  gift_card_tax_total?: Maybe<Scalars['Int']['output']>;
  gift_card_total?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  item_subtotal?: Maybe<Scalars['Int']['output']>;
  item_tax_total?: Maybe<Scalars['Int']['output']>;
  item_total?: Maybe<Scalars['Int']['output']>;
  items?: Maybe<Array<LineItem>>;
  original_item_subtotal?: Maybe<Scalars['Int']['output']>;
  original_item_tax_total?: Maybe<Scalars['Int']['output']>;
  original_item_total?: Maybe<Scalars['Int']['output']>;
  original_shipping_subtotal?: Maybe<Scalars['Int']['output']>;
  original_shipping_tax_total?: Maybe<Scalars['Int']['output']>;
  original_shipping_total?: Maybe<Scalars['Int']['output']>;
  original_subtotal?: Maybe<Scalars['Int']['output']>;
  original_tax_total?: Maybe<Scalars['Int']['output']>;
  original_total?: Maybe<Scalars['Int']['output']>;
  payment_collection?: Maybe<PaymentCollection>;
  promo_codes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  promotions?: Maybe<Array<Maybe<Promotion>>>;
  region?: Maybe<Region>;
  region_id?: Maybe<Scalars['String']['output']>;
  shipping_address?: Maybe<Address>;
  shipping_methods?: Maybe<Array<ShippingMethod>>;
  shipping_subtotal?: Maybe<Scalars['Int']['output']>;
  shipping_tax_total?: Maybe<Scalars['Int']['output']>;
  shipping_total?: Maybe<Scalars['Int']['output']>;
  subtotal?: Maybe<Scalars['Int']['output']>;
  tax_total?: Maybe<Scalars['Int']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type Collection = {
  __typename?: 'Collection';
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  products?: Maybe<ProductList>;
  title: Scalars['String']['output'];
};

export type Customer = {
  __typename?: 'Customer';
  addresses?: Maybe<Array<Maybe<CustomerAddress>>>;
  companyName?: Maybe<Scalars['String']['output']>;
  defaultBillingAddressId?: Maybe<Scalars['String']['output']>;
  defaultShippingAddressId?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type CustomerAddress = {
  __typename?: 'CustomerAddress';
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  addressName?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  customerId?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isDefaultBilling?: Maybe<Scalars['Boolean']['output']>;
  isDefaultShipping?: Maybe<Scalars['Boolean']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
};

export type FileBlock = {
  __typename?: 'FileBlock';
  _key: Scalars['String']['output'];
  _type: Scalars['String']['output'];
  asset?: Maybe<SanityFileAsset>;
};

export type Footer = {
  __typename?: 'Footer';
  copyright?: Maybe<Scalars['String']['output']>;
  poweredByCta?: Maybe<RichText>;
  social?: Maybe<Array<SocialLink>>;
  storeName?: Maybe<Scalars['String']['output']>;
};

export type IconLinkMark = {
  __typename?: 'IconLinkMark';
  _key: Scalars['String']['output'];
  _type: Scalars['String']['output'];
  href: Scalars['String']['output'];
  iconClass?: Maybe<Scalars['String']['output']>;
  iconComponent?: Maybe<Scalars['String']['output']>;
  iconFill?: Maybe<Scalars['String']['output']>;
  iconImage?: Maybe<SanityImage>;
  iconType: Scalars['String']['output'];
  iconUrl?: Maybe<Scalars['String']['output']>;
  target?: Maybe<Scalars['String']['output']>;
};

export type ImageBlock = {
  __typename?: 'ImageBlock';
  _key: Scalars['String']['output'];
  _type: Scalars['String']['output'];
  alt?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<SanityImageAsset>;
  caption?: Maybe<Scalars['String']['output']>;
};

export type ImageDimensions = {
  __typename?: 'ImageDimensions';
  aspectRatio: Scalars['Float']['output'];
  height: Scalars['Int']['output'];
  width: Scalars['Int']['output'];
};

export type ImageMetadata = {
  __typename?: 'ImageMetadata';
  dimensions?: Maybe<ImageDimensions>;
  hasAlpha?: Maybe<Scalars['Boolean']['output']>;
  isOpaque?: Maybe<Scalars['Boolean']['output']>;
};

export type LinkMark = {
  __typename?: 'LinkMark';
  _key: Scalars['String']['output'];
  _type: Scalars['String']['output'];
  href: Scalars['String']['output'];
  target?: Maybe<Scalars['String']['output']>;
};

export type LineItem = {
  __typename?: 'LineItem';
  cart?: Maybe<Cart>;
  cart_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  is_discountable?: Maybe<Scalars['Boolean']['output']>;
  is_tax_inclusive?: Maybe<Scalars['Boolean']['output']>;
  original_total?: Maybe<Scalars['Int']['output']>;
  product_handle?: Maybe<Scalars['String']['output']>;
  product_title?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  requires_shipping?: Maybe<Scalars['Boolean']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  unit_price?: Maybe<Scalars['Int']['output']>;
  variant?: Maybe<ProductVariant>;
};

export type LogoutResponse = {
  __typename?: 'LogoutResponse';
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type MarkDef = IconLinkMark | LinkMark;

export type Mutation = {
  __typename?: 'Mutation';
  addShippingMethod?: Maybe<Cart>;
  completeCart?: Maybe<CompleteCartResponse>;
  createCart?: Maybe<Cart>;
  createLineItem?: Maybe<Cart>;
  deleteLineItem: StoreLineItemDeleteResponse;
  login?: Maybe<Token>;
  logout?: Maybe<LogoutResponse>;
};

export type Mutation_LoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Price = {
  __typename?: 'Price';
  amount?: Maybe<Scalars['Float']['output']>;
  currencyCode?: Maybe<Scalars['String']['output']>;
  priceType?: Maybe<Scalars['String']['output']>;
};

export type Product = {
  __typename?: 'Product';
  collection?: Maybe<Collection>;
  collectionId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  handle: Scalars['String']['output'];
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  images?: Maybe<Array<ProductImage>>;
  length?: Maybe<Scalars['Float']['output']>;
  material?: Maybe<Scalars['String']['output']>;
  options?: Maybe<Array<ProductOption>>;
  originCountry?: Maybe<Scalars['String']['output']>;
  tags?: Maybe<Array<ProductTag>>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title: Scalars['String']['output'];
  type?: Maybe<Scalars['String']['output']>;
  variants?: Maybe<Array<ProductVariant>>;
  weight?: Maybe<Scalars['Float']['output']>;
  width?: Maybe<Scalars['Float']['output']>;
};

export type ProductCategory = {
  __typename?: 'ProductCategory';
  categoryChildren?: Maybe<Array<ProductCategory>>;
  description?: Maybe<Scalars['String']['output']>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentCategory?: Maybe<ProductCategory>;
  products?: Maybe<ProductList>;
};

export type ProductHit = {
  __typename?: 'ProductHit';
  description?: Maybe<Scalars['String']['output']>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ProductImage = {
  __typename?: 'ProductImage';
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type ProductList = {
  __typename?: 'ProductList';
  count: Scalars['Int']['output'];
  items?: Maybe<Array<Product>>;
};

export type ProductListResponse = {
  __typename?: 'ProductListResponse';
  count: Scalars['Int']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
};

export type ProductOption = {
  __typename?: 'ProductOption';
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  values: Array<ProductOptionValue>;
};

export type ProductOptionValue = {
  __typename?: 'ProductOptionValue';
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type ProductTag = {
  __typename?: 'ProductTag';
  id: Scalars['ID']['output'];
};

export type ProductVariant = {
  __typename?: 'ProductVariant';
  allowBackorder?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  inventoryQuantity?: Maybe<Scalars['Int']['output']>;
  manageInventory?: Maybe<Scalars['Boolean']['output']>;
  options?: Maybe<Array<Maybe<ProductVariantOption>>>;
  originalPrice?: Maybe<Price>;
  price?: Maybe<Price>;
  sku?: Maybe<Scalars['String']['output']>;
};

export type ProductVariantOption = {
  __typename?: 'ProductVariantOption';
  id: Scalars['ID']['output'];
  optionId: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type Promotion = {
  __typename?: 'Promotion';
  id?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  getCart?: Maybe<Cart>;
  footer?: Maybe<Footer>;
  me?: Maybe<Customer>;
  product?: Maybe<Product>;
  productCategories: Array<ProductCategory>;
  productCategory?: Maybe<ProductCategory>;
  products: ProductListResponse;
  searchProducts: SearchProducts;
};

export type Query_CollectionArgs = {
  id: Scalars['ID']['input'];
};

export type Query_CollectionsArgs = {
  handle?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type Query_GetCartArgs = {
  id: Scalars['ID']['input'];
};

export type Query_ProductArgs = {
  id: Scalars['ID']['input'];
  region_id?: InputMaybe<Scalars['String']['input']>;
};

export type Query_ProductCategoriesArgs = {
  handle?: InputMaybe<Scalars['String']['input']>;
  include_descendants_tree?: InputMaybe<Scalars['Boolean']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_internal?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  parent_category_id?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};

export type Query_ProductCategoryArgs = {
  id: Scalars['ID']['input'];
};

export type Query_ProductsArgs = {
  category_id?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  collection_id?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  handle?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Array<Scalars['ID']['input']>>;
  is_giftcard?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  region_id?: InputMaybe<Scalars['String']['input']>;
  tag_id?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type Query_SearchProductsArgs = {
  facets?: InputMaybe<Array<Scalars['String']['input']>>;
  filters?: InputMaybe<Scalars['String']['input']>;
  hitsPerPage?: InputMaybe<Scalars['Int']['input']>;
  indexName?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type RichText = {
  __typename?: 'RichText';
  text: Array<RichTextBlock>;
};

export type RichTextBlock = FileBlock | ImageBlock | TextBlock;

export type SanityFileAsset = {
  __typename?: 'SanityFileAsset';
  _id: Scalars['ID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  originalFilename?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  url: Scalars['String']['output'];
};

export type SanityImage = {
  __typename?: 'SanityImage';
  alt?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<SanityImageAsset>;
  caption?: Maybe<Scalars['String']['output']>;
};

export type SanityImageAsset = {
  __typename?: 'SanityImageAsset';
  _id: Scalars['ID']['output'];
  metadata?: Maybe<ImageMetadata>;
  url: Scalars['String']['output'];
};

export type SearchProducts = {
  __typename?: 'SearchProducts';
  hitsPerPage: Scalars['Int']['output'];
  items: Array<ProductHit>;
  page: Scalars['Int']['output'];
  params: Scalars['String']['output'];
  query: Scalars['String']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type SocialLink = {
  __typename?: 'SocialLink';
  text: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Span = {
  __typename?: 'Span';
  _key: Scalars['String']['output'];
  _type: Scalars['String']['output'];
  marks?: Maybe<Array<Scalars['String']['output']>>;
  text: Scalars['String']['output'];
};

export type TextBlock = {
  __typename?: 'TextBlock';
  _key: Scalars['String']['output'];
  _type: Scalars['String']['output'];
  children: Array<Span>;
  level?: Maybe<Scalars['Int']['output']>;
  listItem?: Maybe<Scalars['String']['output']>;
  markDefs?: Maybe<Array<MarkDef>>;
  style?: Maybe<Scalars['String']['output']>;
};

export type Region = {
  __typename?: 'Region';
  automatic_taxes?: Maybe<Scalars['Boolean']['output']>;
  countries?: Maybe<Array<Maybe<Country>>>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  currency_code: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type ShippingMethod = {
  __typename?: 'ShippingMethod';
  amount?: Maybe<Scalars['Int']['output']>;
  cart_id?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['DateTime']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  is_tax_inclusive?: Maybe<Scalars['Boolean']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  shipping_option_id?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['DateTime']['output']>;
};

export type StoreLineItemDeleteResponse = {
  __typename?: 'StoreLineItemDeleteResponse';
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  object?: Maybe<Scalars['String']['output']>;
};

export type Token = {
  __typename?: 'Token';
  token?: Maybe<Scalars['String']['output']>;
};

export type UpdateCartInput = {
  billing_address?: InputMaybe<AddressInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  promo_codes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  region_id?: InputMaybe<Scalars['String']['input']>;
  shipping_address?: InputMaybe<AddressInput>;
};

export type UpdateLineItemInput = {
  quantity: Scalars['Int']['input'];
};

export type CartItemFieldsFragment = {
  __typename?: 'LineItem';
  id: string;
  title?: string | null;
  quantity: number;
  unit_price?: number | null;
  created_at?: any | null;
  thumbnail?: string | null;
  product_handle?: string | null;
  product_title?: string | null;
  total?: number | null;
  original_total?: number | null;
  variant?: ({ __typename?: 'ProductVariant' } & ProductVariantFragment) | null;
};

export type AddressFieldsFragment = {
  __typename?: 'Address';
  first_name?: string | null;
  last_name?: string | null;
  phone?: string | null;
  address_1?: string | null;
  city?: string | null;
  country_code?: string | null;
  postal_code?: string | null;
};

export type ShippingMethodFieldsFragment = {
  __typename?: 'ShippingMethod';
  id?: string | null;
  cart_id?: string | null;
  name?: string | null;
  amount?: number | null;
  is_tax_inclusive?: boolean | null;
  shipping_option_id?: string | null;
};

export type PaymentCollectionFieldsFragment = {
  __typename?: 'PaymentCollection';
  id?: string | null;
  currency_code?: string | null;
  amount?: number | null;
  status?: PaymentStatus | null;
  payment_providers?: Array<{
    __typename?: 'PaymentProviders';
    id?: string | null;
  } | null> | null;
  payment_sessions?: Array<{
    __typename?: 'PaymentSessions';
    id?: string | null;
    amount?: number | null;
    currency_code?: string | null;
    provider_id?: string | null;
    data?: any | null;
    status?: PaymentSessionStatus | null;
  } | null> | null;
};

export type CountryFieldsFragment = {
  __typename?: 'Country';
  id?: string | null;
  iso_2?: string | null;
  iso_3?: string | null;
  name?: string | null;
  display_name?: string | null;
};

export type RegionFieldsFragment = {
  __typename?: 'Region';
  id: string;
  name: string;
  currency_code: string;
  automatic_taxes?: boolean | null;
  created_at?: any | null;
  updated_at?: any | null;
  countries?: Array<
    ({ __typename?: 'Country' } & CountryFieldsFragment) | null
  > | null;
};

export type CartFieldsFragment = {
  __typename?: 'Cart';
  id: string;
  region_id?: string | null;
  email?: string | null;
  total?: number | null;
  subtotal?: number | null;
  tax_total?: number | null;
  discount_total?: number | null;
  gift_card_total?: number | null;
  shipping_subtotal?: number | null;
  original_total?: number | null;
  currency_code: string;
  items?: Array<{ __typename?: 'LineItem' } & CartItemFieldsFragment> | null;
  shipping_address?:
    | ({ __typename?: 'Address' } & AddressFieldsFragment)
    | null;
  billing_address?: ({ __typename?: 'Address' } & AddressFieldsFragment) | null;
  region?: ({ __typename?: 'Region' } & RegionFieldsFragment) | null;
  shipping_methods?: Array<
    { __typename?: 'ShippingMethod' } & ShippingMethodFieldsFragment
  > | null;
  payment_collection?:
    | ({ __typename?: 'PaymentCollection' } & PaymentCollectionFieldsFragment)
    | null;
};

export type CustomerAddressFragment = {
  __typename?: 'CustomerAddress';
  id: string;
  addressName?: string | null;
  isDefaultShipping?: boolean | null;
  isDefaultBilling?: boolean | null;
  customerId?: string | null;
  company?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  address1?: string | null;
  address2?: string | null;
  city?: string | null;
  countryCode?: string | null;
  province?: string | null;
  postalCode?: string | null;
  phone?: string | null;
};

export type CustomerFragment = {
  __typename?: 'Customer';
  id: string;
  email?: string | null;
  defaultBillingAddressId?: string | null;
  defaultShippingAddressId?: string | null;
  companyName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  addresses?: Array<
    ({ __typename?: 'CustomerAddress' } & CustomerAddressFragment) | null
  > | null;
};

export type ProductImageFragment = {
  __typename?: 'ProductImage';
  id: string;
  url: string;
};

export type ProductTagFragment = { __typename?: 'ProductTag'; id: string };

export type ProductOptionFragment = {
  __typename?: 'ProductOption';
  id: string;
  title: string;
  values: Array<{
    __typename?: 'ProductOptionValue';
    id: string;
    value: string;
  }>;
};

export type PriceFragment = {
  __typename?: 'Price';
  amount?: number | null;
  currencyCode?: string | null;
  priceType?: string | null;
};

export type ProductVariantFragment = {
  __typename?: 'ProductVariant';
  id: string;
  sku?: string | null;
  inventoryQuantity?: number | null;
  allowBackorder?: boolean | null;
  manageInventory?: boolean | null;
  options?: Array<{
    __typename?: 'ProductVariantOption';
    id: string;
    optionId: string;
    value: string;
  } | null> | null;
  price?: ({ __typename?: 'Price' } & PriceFragment) | null;
  originalPrice?: ({ __typename?: 'Price' } & PriceFragment) | null;
};

export type ProductCategoryFragment = {
  __typename?: 'ProductCategory';
  id: string;
  name: string;
  description?: string | null;
  handle: string;
};

export type ProductCollectionFragment = {
  __typename?: 'Collection';
  id: string;
  title: string;
  handle: string;
};

export type ProductFragment = {
  __typename?: 'Product';
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
  type?: string | null;
  collectionId?: string | null;
  createdAt: any;
  images?: Array<{ __typename?: 'ProductImage' } & ProductImageFragment> | null;
  tags?: Array<{ __typename?: 'ProductTag' } & ProductTagFragment> | null;
  options?: Array<
    { __typename?: 'ProductOption' } & ProductOptionFragment
  > | null;
  variants?: Array<
    { __typename?: 'ProductVariant' } & ProductVariantFragment
  > | null;
  collection?:
    | ({ __typename?: 'Collection' } & ProductCollectionFragment)
    | null;
};

export type CollectionProductsFragment = {
  __typename?: 'ProductList';
  count: number;
  items?: Array<{
    __typename?: 'Product';
    id: string;
    title: string;
    handle: string;
    thumbnail?: string | null;
    images?: Array<
      { __typename?: 'ProductImage' } & ProductImageFragment
    > | null;
    variants?: Array<{
      __typename?: 'ProductVariant';
      price?: ({ __typename?: 'Price' } & PriceFragment) | null;
      originalPrice?: ({ __typename?: 'Price' } & PriceFragment) | null;
    }> | null;
  }> | null;
};

export type CreateCartMutationVariables = Exact<{
  data: CreateCartInput;
}>;

export type CreateCartMutation = {
  __typename?: 'Mutation';
  createCart?: ({ __typename?: 'Cart' } & CartFieldsFragment) | null;
};

export type UpdateCartMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  data: UpdateCartInput;
}>;

export type UpdateCartMutation = {
  __typename?: 'Mutation';
  updateCart?:
    | ({
        __typename?: 'Cart';
        region_id?: string | null;
        currency_code: string;
        shipping_address?:
          | ({ __typename?: 'Address' } & AddressFieldsFragment)
          | null;
        billing_address?:
          | ({ __typename?: 'Address' } & AddressFieldsFragment)
          | null;
      } & CartFieldsFragment)
    | null;
};

export type CreateLineItemMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  data: CreateLineItemInput;
}>;

export type CreateLineItemMutation = {
  __typename?: 'Mutation';
  createLineItem?: {
    __typename?: 'Cart';
    id: string;
    total?: number | null;
    items?: Array<{ __typename?: 'LineItem' } & CartItemFieldsFragment> | null;
  } | null;
};

export type UpdateLineItemMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  lineItemId: Scalars['ID']['input'];
  data: UpdateLineItemInput;
}>;

export type UpdateLineItemMutation = {
  __typename?: 'Mutation';
  updateLineItem?: {
    __typename?: 'Cart';
    id: string;
    total?: number | null;
    items?: Array<{ __typename?: 'LineItem' } & CartItemFieldsFragment> | null;
  } | null;
};

export type DeleteLineItemMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  lineItemId: Scalars['ID']['input'];
}>;

export type DeleteLineItemMutation = {
  __typename?: 'Mutation';
  deleteLineItem: {
    __typename?: 'StoreLineItemDeleteResponse';
    id: string;
    object?: string | null;
    deleted: boolean;
  };
};

export type AddShippingMethodMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
  optionId: Scalars['ID']['input'];
}>;

export type AddShippingMethodMutation = {
  __typename?: 'Mutation';
  addShippingMethod?: {
    __typename?: 'Cart';
    id: string;
    total?: number | null;
    items?: Array<{ __typename?: 'LineItem' } & CartItemFieldsFragment> | null;
    shipping_methods?: Array<
      { __typename?: 'ShippingMethod' } & ShippingMethodFieldsFragment
    > | null;
  } | null;
};

export type CompleteCartMutationVariables = Exact<{
  cartId: Scalars['ID']['input'];
}>;

export type CompleteCartMutation = {
  __typename?: 'Mutation';
  completeCart?:
    | {
        __typename: 'CompleteCartErrorResult';
        type: string;
        error?: {
          __typename?: 'CompleteCartError';
          message: string;
          name: string;
          type: string;
        } | null;
        cart?: {
          __typename?: 'Cart';
          id: string;
          total?: number | null;
          items?: Array<
            { __typename?: 'LineItem' } & CartItemFieldsFragment
          > | null;
        } | null;
      }
    | {
        __typename: 'CompleteCartOrderResult';
        type: string;
        order?: {
          __typename?: 'Order';
          id: string;
          email?: string | null;
          status?: string | null;
          total?: number | null;
          items?: Array<
            { __typename?: 'LineItem' } & CartItemFieldsFragment
          > | null;
          shipping_methods?: Array<
            { __typename?: 'ShippingMethod' } & ShippingMethodFieldsFragment
          > | null;
        } | null;
      }
    | null;
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login?: { __typename?: 'Token'; token?: string | null } | null;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = {
  __typename?: 'Mutation';
  logout?: { __typename?: 'LogoutResponse'; success?: boolean | null } | null;
};

export type GetCartQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCartQuery = {
  __typename?: 'Query';
  getCart?: ({ __typename?: 'Cart' } & CartFieldsFragment) | null;
};

export type GetCustomerQueryVariables = Exact<{ [key: string]: never }>;

export type GetCustomerQuery = {
  __typename?: 'Query';
  me?: ({ __typename?: 'Customer' } & CustomerFragment) | null;
};

export type GetFooterQueryVariables = Exact<{ [key: string]: never }>;

export type GetFooterQuery = {
  __typename?: 'Query';
  footer?: {
    __typename?: 'Footer';
    storeName?: string | null;
    copyright?: string | null;
    social?: Array<{
      __typename?: 'SocialLink';
      text: string;
      url: string;
    }> | null;
    poweredByCta?: {
      __typename?: 'RichText';
      text: Array<
        | {
            __typename?: 'FileBlock';
            _key: string;
            _type: string;
            asset?: {
              __typename?: 'SanityFileAsset';
              url: string;
              originalFilename?: string | null;
              size?: number | null;
              mimeType?: string | null;
            } | null;
          }
        | {
            __typename?: 'ImageBlock';
            _key: string;
            _type: string;
            alt?: string | null;
            asset?: { __typename?: 'SanityImageAsset'; url: string } | null;
          }
        | {
            __typename?: 'TextBlock';
            _key: string;
            _type: string;
            style?: string | null;
            children: Array<{
              __typename?: 'Span';
              _key: string;
              text: string;
              marks?: Array<string> | null;
            }>;
            markDefs?: Array<
              | {
                  __typename?: 'IconLinkMark';
                  _key: string;
                  _type: string;
                  href: string;
                  iconType: string;
                  iconClass?: string | null;
                  iconFill?: string | null;
                  iconComponent?: string | null;
                  iconUrl?: string | null;
                  target?: string | null;
                  iconImage?: {
                    __typename?: 'SanityImage';
                    alt?: string | null;
                    asset?: {
                      __typename?: 'SanityImageAsset';
                      url: string;
                    } | null;
                  } | null;
                }
              | {
                  __typename?: 'LinkMark';
                  _key: string;
                  _type: string;
                  href: string;
                  target?: string | null;
                }
            > | null;
          }
      >;
    } | null;
  } | null;
};

export type GetProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  region_id?: InputMaybe<Scalars['String']['input']>;
  category_id?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  collection_id?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
  q?: InputMaybe<Scalars['String']['input']>;
  is_giftcard?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  tag_id?: InputMaybe<
    Array<Scalars['String']['input']> | Scalars['String']['input']
  >;
}>;

export type GetProductsQuery = {
  __typename?: 'Query';
  products: {
    __typename?: 'ProductListResponse';
    count: number;
    products?: Array<
      ({ __typename?: 'Product' } & ProductFragment) | null
    > | null;
  };
};

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  region_id?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetProductQuery = {
  __typename?: 'Query';
  product?: ({ __typename?: 'Product' } & ProductFragment) | null;
};

export type GetProductCategoriesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  parent_category_id?: InputMaybe<Scalars['String']['input']>;
}>;

export type GetProductCategoriesQuery = {
  __typename?: 'Query';
  productCategories: Array<
    {
      __typename?: 'ProductCategory';
      parentCategory?:
        | ({ __typename?: 'ProductCategory' } & ProductCategoryFragment)
        | null;
      categoryChildren?: Array<
        { __typename?: 'ProductCategory' } & ProductCategoryFragment
      > | null;
      products?: { __typename?: 'ProductList'; count: number } | null;
    } & ProductCategoryFragment
  >;
};

export type GetProductCategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetProductCategoryQuery = {
  __typename?: 'Query';
  productCategory?:
    | ({
        __typename?: 'ProductCategory';
        parentCategory?:
          | ({
              __typename?: 'ProductCategory';
              parentCategory?:
                | ({ __typename?: 'ProductCategory' } & ProductCategoryFragment)
                | null;
            } & ProductCategoryFragment)
          | null;
        categoryChildren?: Array<
          { __typename?: 'ProductCategory' } & ProductCategoryFragment
        > | null;
        products?: { __typename?: 'ProductList'; count: number } | null;
      } & ProductCategoryFragment)
    | null;
};

export type GetCollectionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetCollectionsQuery = {
  __typename?: 'Query';
  collections: Array<
    {
      __typename?: 'Collection';
      products?:
        | ({ __typename?: 'ProductList' } & CollectionProductsFragment)
        | null;
    } & ProductCollectionFragment
  >;
};

export type GetCollectionsSummaryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  handle?: InputMaybe<
    | Array<InputMaybe<Scalars['String']['input']>>
    | InputMaybe<Scalars['String']['input']>
  >;
}>;

export type GetCollectionsSummaryQuery = {
  __typename?: 'Query';
  collections: Array<
    {
      __typename?: 'Collection';
      products?: { __typename?: 'ProductList'; count: number } | null;
    } & ProductCollectionFragment
  >;
};

export type GetCollectionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;

export type GetCollectionQuery = {
  __typename?: 'Query';
  collection?:
    | ({
        __typename?: 'Collection';
        products?:
          | ({ __typename?: 'ProductList' } & CollectionProductsFragment)
          | null;
      } & ProductCollectionFragment)
    | null;
};

export type SearchSuggestionsQueryVariables = Exact<{
  query: Scalars['String']['input'];
}>;

export const CustomerAddressFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerAddress' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CustomerAddress' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefaultShipping' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefaultBilling' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'company' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'province' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CustomerAddressFragment, unknown>;
export const CustomerFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Customer' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Customer' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'defaultBillingAddressId' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'defaultShippingAddressId' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'companyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addresses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CustomerAddress' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerAddress' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CustomerAddress' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefaultShipping' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefaultBilling' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'company' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'province' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CustomerFragment, unknown>;
export const ProductCategoryFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCategory' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductCategory' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductCategoryFragment, unknown>;
export const ProductImageFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductImage' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductImageFragment, unknown>;
export const ProductTagFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductTag' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductTag' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
      },
    },
  ],
} as unknown as DocumentNode<ProductTagFragment, unknown>;
export const ProductOptionFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductOption' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductOption' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'values' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductOptionFragment, unknown>;
export const PriceFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PriceFragment, unknown>;
export const ProductVariantFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductVariantFragment, unknown>;
export const ProductCollectionFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCollection' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Collection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductCollectionFragment, unknown>;
export const ProductFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Product' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Product' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'width' } },
          { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
          { kind: 'Field', name: { kind: 'Name', value: 'length' } },
          { kind: 'Field', name: { kind: 'Name', value: 'height' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originCountry' } },
          { kind: 'Field', name: { kind: 'Name', value: 'material' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'collectionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'images' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductImage' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductTag' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductOption' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductCollection' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductImage' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductTag' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductTag' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductOption' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductOption' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'values' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCollection' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Collection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ProductFragment, unknown>;
export const CollectionProductsFragmentDoc = {
  kind: 'Document',
  definitions: [
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CollectionProducts' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductList' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ProductImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'price' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'Price' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'originalPrice' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'Price' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductImage' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CollectionProductsFragment, unknown>;
export const LoginDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Login' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'email' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'password' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'login' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'email' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'email' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'password' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'password' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'token' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'Logout' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'logout' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'success' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const GetCustomerDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCustomer' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'me' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Customer' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CustomerAddress' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'CustomerAddress' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'addressName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefaultShipping' } },
          { kind: 'Field', name: { kind: 'Name', value: 'isDefaultBilling' } },
          { kind: 'Field', name: { kind: 'Name', value: 'customerId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'company' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address1' } },
          { kind: 'Field', name: { kind: 'Name', value: 'address2' } },
          { kind: 'Field', name: { kind: 'Name', value: 'city' } },
          { kind: 'Field', name: { kind: 'Name', value: 'countryCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'province' } },
          { kind: 'Field', name: { kind: 'Name', value: 'postalCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Customer' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Customer' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'email' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'defaultBillingAddressId' },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'defaultShippingAddressId' },
          },
          { kind: 'Field', name: { kind: 'Name', value: 'companyName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
          { kind: 'Field', name: { kind: 'Name', value: 'phone' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'addresses' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'CustomerAddress' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCustomerQuery, GetCustomerQueryVariables>;
export const GetProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProducts' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'handle' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'region_id' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'category_id' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'collection_id' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'q' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'is_giftcard' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Boolean' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tag_id' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NonNullType',
              type: {
                kind: 'NamedType',
                name: { kind: 'Name', value: 'String' },
              },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'products' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'handle' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'handle' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'region_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'region_id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'category_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'category_id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'collection_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'collection_id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'q' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'q' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'is_giftcard' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'is_giftcard' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tag_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'tag_id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'Product' },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'count' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductImage' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductTag' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductTag' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductOption' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductOption' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'values' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCollection' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Collection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Product' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Product' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'width' } },
          { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
          { kind: 'Field', name: { kind: 'Name', value: 'length' } },
          { kind: 'Field', name: { kind: 'Name', value: 'height' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originCountry' } },
          { kind: 'Field', name: { kind: 'Name', value: 'material' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'collectionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'images' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductImage' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductTag' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductOption' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductCollection' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'region_id' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'product' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'region_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'region_id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Product' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductImage' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductTag' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductTag' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'id' } }],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductOption' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductOption' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'values' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductVariant' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductVariant' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'sku' } },
          { kind: 'Field', name: { kind: 'Name', value: 'inventoryQuantity' } },
          { kind: 'Field', name: { kind: 'Name', value: 'allowBackorder' } },
          { kind: 'Field', name: { kind: 'Name', value: 'manageInventory' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'optionId' } },
                { kind: 'Field', name: { kind: 'Name', value: 'value' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'price' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'originalPrice' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'Price' },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCollection' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Collection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Product' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Product' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
          { kind: 'Field', name: { kind: 'Name', value: 'width' } },
          { kind: 'Field', name: { kind: 'Name', value: 'weight' } },
          { kind: 'Field', name: { kind: 'Name', value: 'length' } },
          { kind: 'Field', name: { kind: 'Name', value: 'height' } },
          { kind: 'Field', name: { kind: 'Name', value: 'originCountry' } },
          { kind: 'Field', name: { kind: 'Name', value: 'material' } },
          { kind: 'Field', name: { kind: 'Name', value: 'type' } },
          { kind: 'Field', name: { kind: 'Name', value: 'collectionId' } },
          { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'images' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductImage' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tags' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductTag' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'options' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductOption' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'variants' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductVariant' },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductCollection' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const GetProductCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProductCategories' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'q' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'handle' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'parent_category_id' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'productCategories' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'q' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'q' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'handle' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'handle' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'parent_category_id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'parent_category_id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductCategory' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'parentCategory' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ProductCategory' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categoryChildren' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ProductCategory' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCategory' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductCategory' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProductCategoriesQuery,
  GetProductCategoriesQueryVariables
>;
export const GetProductCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProductCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'productCategory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductCategory' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'parentCategory' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ProductCategory' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'parentCategory' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'ProductCategory' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categoryChildren' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ProductCategory' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCategory' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductCategory' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'name' } },
          { kind: 'Field', name: { kind: 'Name', value: 'description' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProductCategoryQuery,
  GetProductCategoryQueryVariables
>;
export const GetCollectionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCollections' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collections' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductCollection' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CollectionProducts' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductImage' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCollection' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Collection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CollectionProducts' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductList' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ProductImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'price' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'Price' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'originalPrice' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'Price' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const GetCollectionsSummaryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCollectionsSummary' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'limit' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'offset' },
          },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'handle' },
          },
          type: {
            kind: 'ListType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collections' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'limit' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'limit' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'offset' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'offset' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'handle' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'handle' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductCollection' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'count' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCollection' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Collection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetCollectionsSummaryQuery,
  GetCollectionsSummaryQueryVariables
>;
export const GetCollectionDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCollection' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'collection' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'id' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'FragmentSpread',
                  name: { kind: 'Name', value: 'ProductCollection' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'CollectionProducts' },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductImage' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductImage' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'url' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'Price' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Price' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
          { kind: 'Field', name: { kind: 'Name', value: 'currencyCode' } },
          { kind: 'Field', name: { kind: 'Name', value: 'priceType' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'ProductCollection' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'Collection' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'id' } },
          { kind: 'Field', name: { kind: 'Name', value: 'title' } },
          { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
        ],
      },
    },
    {
      kind: 'FragmentDefinition',
      name: { kind: 'Name', value: 'CollectionProducts' },
      typeCondition: {
        kind: 'NamedType',
        name: { kind: 'Name', value: 'ProductList' },
      },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          { kind: 'Field', name: { kind: 'Name', value: 'count' } },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'items' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'handle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'thumbnail' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'FragmentSpread',
                        name: { kind: 'Name', value: 'ProductImage' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'variants' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'price' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'Price' },
                            },
                          ],
                        },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'originalPrice' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'FragmentSpread',
                              name: { kind: 'Name', value: 'Price' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCollectionQuery, GetCollectionQueryVariables>;

import type {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';

import type { GraphQLContext } from '../types/context';

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
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: string; output: string };
  JSON: {
    input: { [key: string]: unknown };
    output: { [key: string]: unknown };
  };
};

export type Address = {
  address1?: Maybe<Scalars['String']['output']>;
  address2?: Maybe<Scalars['String']['output']>;
  city?: Maybe<Scalars['String']['output']>;
  company?: Maybe<Scalars['String']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  postalCode?: Maybe<Scalars['String']['output']>;
  province?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  address1?: InputMaybe<Scalars['String']['input']>;
  address2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  company?: InputMaybe<Scalars['String']['input']>;
  countryCode?: InputMaybe<Scalars['String']['input']>;
  customerId?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  postalCode?: InputMaybe<Scalars['String']['input']>;
  province?: InputMaybe<Scalars['String']['input']>;
};

export type ApplicationMethod = {
  currencyCode: Scalars['String']['output'];
  type: ApplicationType;
  value: Scalars['String']['output'];
};

export type ApplicationType = 'fixed' | 'percentage';

export type Cart = {
  billingAddress?: Maybe<Address>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currencyCode: Scalars['String']['output'];
  customerId?: Maybe<Scalars['String']['output']>;
  discountTotal: Scalars['Int']['output'];
  email?: Maybe<Scalars['String']['output']>;
  giftCardTotal: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  itemTotal: Scalars['Int']['output'];
  items?: Maybe<Array<LineItem>>;
  originalTotal: Scalars['Int']['output'];
  paymentCollection?: Maybe<PaymentCollection>;
  promoCodes?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  promotions: Array<Maybe<Promotion>>;
  region?: Maybe<Region>;
  regionId?: Maybe<Scalars['String']['output']>;
  shippingAddress?: Maybe<Address>;
  shippingMethods?: Maybe<Array<Maybe<ShippingMethod>>>;
  shippingTotal: Scalars['Int']['output'];
  subtotal: Scalars['Int']['output'];
  taxTotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Collection = {
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  products?: Maybe<ProductList>;
  title: Scalars['String']['output'];
};

export type CompleteCartError = {
  message: Scalars['String']['output'];
  name: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type CompleteCartErrorResult = {
  cart?: Maybe<Cart>;
  error?: Maybe<CompleteCartError>;
  type: Scalars['String']['output'];
};

export type CompleteCartOrderResult = {
  order?: Maybe<Order>;
  type: Scalars['String']['output'];
};

export type CompleteCartResponse =
  | CompleteCartErrorResult
  | CompleteCartOrderResult;

export type Country = {
  displayName?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['String']['output']>;
  iso2?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CreateCartInput = {
  billingAddress?: InputMaybe<AddressInput>;
  currencyCode?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  items?: InputMaybe<Array<CreateLineItemInput>>;
  promoCodes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regionId?: InputMaybe<Scalars['String']['input']>;
  shippingAddress?: InputMaybe<AddressInput>;
};

export type CreateLineItemInput = {
  quantity: Scalars['Int']['input'];
  variantId: Scalars['String']['input'];
};

export type Customer = {
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
  _key: Scalars['String']['output'];
  _type: Scalars['String']['output'];
  asset?: Maybe<SanityFileAsset>;
};

export type Footer = {
  copyright?: Maybe<Scalars['String']['output']>;
  poweredByCta?: Maybe<RichText>;
  social?: Maybe<Array<SocialLink>>;
  storeName?: Maybe<Scalars['String']['output']>;
};

export type IconLinkMark = {
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
  _key: Scalars['String']['output'];
  _type: Scalars['String']['output'];
  alt?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<SanityImageAsset>;
  caption?: Maybe<Scalars['String']['output']>;
};

export type ImageDimensions = {
  aspectRatio: Scalars['Float']['output'];
  height: Scalars['Int']['output'];
  width: Scalars['Int']['output'];
};

export type ImageMetadata = {
  dimensions?: Maybe<ImageDimensions>;
  hasAlpha?: Maybe<Scalars['Boolean']['output']>;
  isOpaque?: Maybe<Scalars['Boolean']['output']>;
};

export type LineItem = {
  cart?: Maybe<Cart>;
  cartId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  originalTotal?: Maybe<Scalars['Int']['output']>;
  productHandle?: Maybe<Scalars['String']['output']>;
  productTitle?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Int']['output'];
  requiresShipping?: Maybe<Scalars['Boolean']['output']>;
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
  unitPrice?: Maybe<Scalars['Int']['output']>;
  variant?: Maybe<ProductVariant>;
};

export type LinkMark = {
  _key: Scalars['String']['output'];
  _type: Scalars['String']['output'];
  href: Scalars['String']['output'];
  target?: Maybe<Scalars['String']['output']>;
};

export type LogoutResponse = {
  success?: Maybe<Scalars['Boolean']['output']>;
};

export type MarkDef = IconLinkMark | LinkMark;

export type Mutation = {
  addShippingMethod?: Maybe<Cart>;
  applyPromotions?: Maybe<Cart>;
  completeCart?: Maybe<CompleteCartResponse>;
  createCart?: Maybe<Cart>;
  createLineItem?: Maybe<Cart>;
  deleteLineItem: StoreLineItemDeleteResponse;
  login?: Maybe<Token>;
  logout?: Maybe<LogoutResponse>;
  transferCart?: Maybe<Cart>;
  updateCart?: Maybe<Cart>;
  updateLineItem?: Maybe<Cart>;
};

export type MutationAddShippingMethodArgs = {
  cartId: Scalars['ID']['input'];
  optionId: Scalars['ID']['input'];
};

export type MutationApplyPromotionsArgs = {
  cartId: Scalars['ID']['input'];
  codes: Array<Scalars['String']['input']>;
};

export type MutationCompleteCartArgs = {
  cartId: Scalars['ID']['input'];
};

export type MutationCreateCartArgs = {
  data: CreateCartInput;
};

export type MutationCreateLineItemArgs = {
  cartId: Scalars['ID']['input'];
  data: CreateLineItemInput;
};

export type MutationDeleteLineItemArgs = {
  cartId: Scalars['ID']['input'];
  lineItemId: Scalars['ID']['input'];
};

export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MutationTransferCartArgs = {
  cartId: Scalars['ID']['input'];
};

export type MutationUpdateCartArgs = {
  data: UpdateCartInput;
  id: Scalars['ID']['input'];
};

export type MutationUpdateLineItemArgs = {
  cartId: Scalars['ID']['input'];
  data: UpdateLineItemInput;
  lineItemId: Scalars['ID']['input'];
};

export type Order = {
  createdAt: Scalars['DateTime']['output'];
  currencyCode: Scalars['String']['output'];
  customerId: Scalars['String']['output'];
  discountTotal?: Maybe<Scalars['Int']['output']>;
  displayId?: Maybe<Scalars['Int']['output']>;
  email: Scalars['String']['output'];
  fulfillmentStatus: Scalars['String']['output'];
  giftCardTotal?: Maybe<Scalars['Int']['output']>;
  id: Scalars['ID']['output'];
  items: Array<LineItem>;
  paymentCollections?: Maybe<Array<Maybe<PaymentCollection>>>;
  paymentStatus: Scalars['String']['output'];
  regionId: Scalars['String']['output'];
  shippingAddress?: Maybe<Address>;
  shippingMethods: Array<ShippingMethod>;
  shippingTotal?: Maybe<Scalars['Int']['output']>;
  status: Scalars['String']['output'];
  subtotal?: Maybe<Scalars['Int']['output']>;
  taxTotal?: Maybe<Scalars['Int']['output']>;
  total: Scalars['Int']['output'];
};

export type Payment = {
  amount: Scalars['Int']['output'];
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currencyCode: Scalars['String']['output'];
  data?: Maybe<Scalars['JSON']['output']>;
  id: Scalars['String']['output'];
  providerId: Scalars['String']['output'];
};

export type PaymentCollection = {
  amount: Scalars['Int']['output'];
  currencyCode: Scalars['String']['output'];
  id: Scalars['String']['output'];
  paymentProviders: Array<Maybe<PaymentProviders>>;
  paymentSessions?: Maybe<Array<Maybe<PaymentSessions>>>;
  payments?: Maybe<Array<Maybe<Payment>>>;
  status: PaymentStatus;
};

export type PaymentProviders = {
  id: Scalars['String']['output'];
};

export type PaymentSessionStatus =
  | 'authorized'
  | 'canceled'
  | 'captured'
  | 'error'
  | 'pending'
  | 'requires_more';

export type PaymentSessions = {
  amount: Scalars['Int']['output'];
  currencyCode: Scalars['String']['output'];
  data: Scalars['JSON']['output'];
  id: Scalars['String']['output'];
  providerId: Scalars['String']['output'];
  status: PaymentSessionStatus;
};

export type PaymentStatus =
  | 'authorized'
  | 'awaiting'
  | 'canceled'
  | 'not_paid'
  | 'partially_authorized';

export type Price = {
  amount?: Maybe<Scalars['Float']['output']>;
  currencyCode?: Maybe<Scalars['String']['output']>;
  priceType?: Maybe<Scalars['String']['output']>;
};

export type Product = {
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
  categoryChildren?: Maybe<Array<ProductCategory>>;
  description?: Maybe<Scalars['String']['output']>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  parentCategory?: Maybe<ProductCategory>;
  products?: Maybe<ProductList>;
};

export type ProductHit = {
  description?: Maybe<Scalars['String']['output']>;
  handle: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  thumbnail?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ProductImage = {
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
};

export type ProductList = {
  count: Scalars['Int']['output'];
  items?: Maybe<Array<Product>>;
};

export type ProductListResponse = {
  count: Scalars['Int']['output'];
  products?: Maybe<Array<Maybe<Product>>>;
};

export type ProductOption = {
  id: Scalars['ID']['output'];
  title: Scalars['String']['output'];
  values: Array<ProductOptionValue>;
};

export type ProductOptionValue = {
  id: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type ProductTag = {
  id: Scalars['ID']['output'];
};

export type ProductVariant = {
  allowBackorder?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  inventoryQuantity?: Maybe<Scalars['Int']['output']>;
  manageInventory?: Maybe<Scalars['Boolean']['output']>;
  options?: Maybe<Array<Maybe<ProductVariantOption>>>;
  originalPrice?: Maybe<Price>;
  price?: Maybe<Price>;
  product?: Maybe<Product>;
  sku?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type ProductVariantOption = {
  id: Scalars['ID']['output'];
  optionId: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type Promotion = {
  applicationMethod?: Maybe<ApplicationMethod>;
  code?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  isAutomatic?: Maybe<Scalars['Boolean']['output']>;
};

export type Query = {
  cart?: Maybe<Cart>;
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  footer?: Maybe<Footer>;
  me?: Maybe<Customer>;
  product?: Maybe<Product>;
  productCategories: Array<ProductCategory>;
  productCategory?: Maybe<ProductCategory>;
  products: ProductListResponse;
  searchProducts: SearchProducts;
};

export type QueryCartArgs = {
  id: Scalars['ID']['input'];
};

export type QueryCollectionArgs = {
  id: Scalars['ID']['input'];
};

export type QueryCollectionsArgs = {
  handle?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type QueryProductArgs = {
  id: Scalars['ID']['input'];
  region_id?: InputMaybe<Scalars['String']['input']>;
};

export type QueryProductCategoriesArgs = {
  handle?: InputMaybe<Scalars['String']['input']>;
  include_descendants_tree?: InputMaybe<Scalars['Boolean']['input']>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  is_internal?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  parent_category_id?: InputMaybe<Scalars['String']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
};

export type QueryProductCategoryArgs = {
  id: Scalars['ID']['input'];
};

export type QueryProductsArgs = {
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

export type QuerySearchProductsArgs = {
  facets?: InputMaybe<Array<Scalars['String']['input']>>;
  filters?: InputMaybe<Scalars['String']['input']>;
  hitsPerPage?: InputMaybe<Scalars['Int']['input']>;
  indexName?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
};

export type Region = {
  countries?: Maybe<Array<Maybe<Country>>>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  currencyCode: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type RichText = {
  text: Array<RichTextBlock>;
};

export type RichTextBlock = FileBlock | ImageBlock | TextBlock;

export type SanityFileAsset = {
  _id: Scalars['ID']['output'];
  mimeType?: Maybe<Scalars['String']['output']>;
  originalFilename?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  url: Scalars['String']['output'];
};

export type SanityImage = {
  alt?: Maybe<Scalars['String']['output']>;
  asset?: Maybe<SanityImageAsset>;
  caption?: Maybe<Scalars['String']['output']>;
};

export type SanityImageAsset = {
  _id: Scalars['ID']['output'];
  metadata?: Maybe<ImageMetadata>;
  url: Scalars['String']['output'];
};

export type SearchProducts = {
  hitsPerPage: Scalars['Int']['output'];
  items: Array<ProductHit>;
  page: Scalars['Int']['output'];
  params: Scalars['String']['output'];
  query: Scalars['String']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type ShippingMethod = {
  amount: Scalars['Int']['output'];
  cartId?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  shippingOptionId?: Maybe<Scalars['String']['output']>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type SocialLink = {
  text: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Span = {
  _key: Scalars['String']['output'];
  _type: Scalars['String']['output'];
  marks?: Maybe<Array<Scalars['String']['output']>>;
  text: Scalars['String']['output'];
};

export type StoreLineItemDeleteResponse = {
  deleted: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  object?: Maybe<Scalars['String']['output']>;
};

export type TextBlock = {
  _key: Scalars['String']['output'];
  _type: Scalars['String']['output'];
  children: Array<Span>;
  level?: Maybe<Scalars['Int']['output']>;
  listItem?: Maybe<Scalars['String']['output']>;
  markDefs?: Maybe<Array<MarkDef>>;
  style?: Maybe<Scalars['String']['output']>;
};

export type Token = {
  token?: Maybe<Scalars['String']['output']>;
};

export type UpdateCartInput = {
  billingAddress?: InputMaybe<AddressInput>;
  email?: InputMaybe<Scalars['String']['input']>;
  promoCodes?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  regionId?: InputMaybe<Scalars['String']['input']>;
  shippingAddress?: InputMaybe<AddressInput>;
};

export type UpdateLineItemInput = {
  quantity: Scalars['Int']['input'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<
  TResult,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<
  TTypes,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<
  T = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = Record<PropertyKey, never>,
  TParent = Record<PropertyKey, never>,
  TContext = Record<PropertyKey, never>,
  TArgs = Record<PropertyKey, never>,
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping of union types */
export type ResolversUnionTypes<_RefType extends Record<string, unknown>> = {
  CompleteCartResponse: CompleteCartErrorResult | CompleteCartOrderResult;
  MarkDef: IconLinkMark | LinkMark;
  RichTextBlock:
    | FileBlock
    | ImageBlock
    | (Omit<TextBlock, 'markDefs'> & {
        markDefs?: Maybe<Array<_RefType['MarkDef']>>;
      });
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  AddressInput: AddressInput;
  ApplicationMethod: ResolverTypeWrapper<ApplicationMethod>;
  ApplicationType: ApplicationType;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Cart: ResolverTypeWrapper<Cart>;
  Collection: ResolverTypeWrapper<Collection>;
  CompleteCartError: ResolverTypeWrapper<CompleteCartError>;
  CompleteCartErrorResult: ResolverTypeWrapper<CompleteCartErrorResult>;
  CompleteCartOrderResult: ResolverTypeWrapper<CompleteCartOrderResult>;
  CompleteCartResponse: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['CompleteCartResponse']
  >;
  Country: ResolverTypeWrapper<Country>;
  CreateCartInput: CreateCartInput;
  CreateLineItemInput: CreateLineItemInput;
  Customer: ResolverTypeWrapper<Customer>;
  CustomerAddress: ResolverTypeWrapper<CustomerAddress>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  FileBlock: ResolverTypeWrapper<FileBlock>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Footer: ResolverTypeWrapper<
    Omit<Footer, 'poweredByCta'> & {
      poweredByCta?: Maybe<ResolversTypes['RichText']>;
    }
  >;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  IconLinkMark: ResolverTypeWrapper<IconLinkMark>;
  ImageBlock: ResolverTypeWrapper<ImageBlock>;
  ImageDimensions: ResolverTypeWrapper<ImageDimensions>;
  ImageMetadata: ResolverTypeWrapper<ImageMetadata>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  LineItem: ResolverTypeWrapper<LineItem>;
  LinkMark: ResolverTypeWrapper<LinkMark>;
  LogoutResponse: ResolverTypeWrapper<LogoutResponse>;
  MarkDef: ResolverTypeWrapper<ResolversUnionTypes<ResolversTypes>['MarkDef']>;
  Mutation: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Order: ResolverTypeWrapper<Order>;
  Payment: ResolverTypeWrapper<Payment>;
  PaymentCollection: ResolverTypeWrapper<PaymentCollection>;
  PaymentProviders: ResolverTypeWrapper<PaymentProviders>;
  PaymentSessionStatus: PaymentSessionStatus;
  PaymentSessions: ResolverTypeWrapper<PaymentSessions>;
  PaymentStatus: PaymentStatus;
  Price: ResolverTypeWrapper<Price>;
  Product: ResolverTypeWrapper<Product>;
  ProductCategory: ResolverTypeWrapper<ProductCategory>;
  ProductHit: ResolverTypeWrapper<ProductHit>;
  ProductImage: ResolverTypeWrapper<ProductImage>;
  ProductList: ResolverTypeWrapper<ProductList>;
  ProductListResponse: ResolverTypeWrapper<ProductListResponse>;
  ProductOption: ResolverTypeWrapper<ProductOption>;
  ProductOptionValue: ResolverTypeWrapper<ProductOptionValue>;
  ProductTag: ResolverTypeWrapper<ProductTag>;
  ProductVariant: ResolverTypeWrapper<ProductVariant>;
  ProductVariantOption: ResolverTypeWrapper<ProductVariantOption>;
  Promotion: ResolverTypeWrapper<Promotion>;
  Query: ResolverTypeWrapper<Record<PropertyKey, never>>;
  Region: ResolverTypeWrapper<Region>;
  RichText: ResolverTypeWrapper<
    Omit<RichText, 'text'> & { text: Array<ResolversTypes['RichTextBlock']> }
  >;
  RichTextBlock: ResolverTypeWrapper<
    ResolversUnionTypes<ResolversTypes>['RichTextBlock']
  >;
  SanityFileAsset: ResolverTypeWrapper<SanityFileAsset>;
  SanityImage: ResolverTypeWrapper<SanityImage>;
  SanityImageAsset: ResolverTypeWrapper<SanityImageAsset>;
  SearchProducts: ResolverTypeWrapper<SearchProducts>;
  ShippingMethod: ResolverTypeWrapper<ShippingMethod>;
  SocialLink: ResolverTypeWrapper<SocialLink>;
  Span: ResolverTypeWrapper<Span>;
  StoreLineItemDeleteResponse: ResolverTypeWrapper<StoreLineItemDeleteResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TextBlock: ResolverTypeWrapper<
    Omit<TextBlock, 'markDefs'> & {
      markDefs?: Maybe<Array<ResolversTypes['MarkDef']>>;
    }
  >;
  Token: ResolverTypeWrapper<Token>;
  UpdateCartInput: UpdateCartInput;
  UpdateLineItemInput: UpdateLineItemInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  AddressInput: AddressInput;
  ApplicationMethod: ApplicationMethod;
  Boolean: Scalars['Boolean']['output'];
  Cart: Cart;
  Collection: Collection;
  CompleteCartError: CompleteCartError;
  CompleteCartErrorResult: CompleteCartErrorResult;
  CompleteCartOrderResult: CompleteCartOrderResult;
  CompleteCartResponse: ResolversUnionTypes<ResolversParentTypes>['CompleteCartResponse'];
  Country: Country;
  CreateCartInput: CreateCartInput;
  CreateLineItemInput: CreateLineItemInput;
  Customer: Customer;
  CustomerAddress: CustomerAddress;
  DateTime: Scalars['DateTime']['output'];
  FileBlock: FileBlock;
  Float: Scalars['Float']['output'];
  Footer: Omit<Footer, 'poweredByCta'> & {
    poweredByCta?: Maybe<ResolversParentTypes['RichText']>;
  };
  ID: Scalars['ID']['output'];
  IconLinkMark: IconLinkMark;
  ImageBlock: ImageBlock;
  ImageDimensions: ImageDimensions;
  ImageMetadata: ImageMetadata;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  LineItem: LineItem;
  LinkMark: LinkMark;
  LogoutResponse: LogoutResponse;
  MarkDef: ResolversUnionTypes<ResolversParentTypes>['MarkDef'];
  Mutation: Record<PropertyKey, never>;
  Order: Order;
  Payment: Payment;
  PaymentCollection: PaymentCollection;
  PaymentProviders: PaymentProviders;
  PaymentSessions: PaymentSessions;
  Price: Price;
  Product: Product;
  ProductCategory: ProductCategory;
  ProductHit: ProductHit;
  ProductImage: ProductImage;
  ProductList: ProductList;
  ProductListResponse: ProductListResponse;
  ProductOption: ProductOption;
  ProductOptionValue: ProductOptionValue;
  ProductTag: ProductTag;
  ProductVariant: ProductVariant;
  ProductVariantOption: ProductVariantOption;
  Promotion: Promotion;
  Query: Record<PropertyKey, never>;
  Region: Region;
  RichText: Omit<RichText, 'text'> & {
    text: Array<ResolversParentTypes['RichTextBlock']>;
  };
  RichTextBlock: ResolversUnionTypes<ResolversParentTypes>['RichTextBlock'];
  SanityFileAsset: SanityFileAsset;
  SanityImage: SanityImage;
  SanityImageAsset: SanityImageAsset;
  SearchProducts: SearchProducts;
  ShippingMethod: ShippingMethod;
  SocialLink: SocialLink;
  Span: Span;
  StoreLineItemDeleteResponse: StoreLineItemDeleteResponse;
  String: Scalars['String']['output'];
  TextBlock: Omit<TextBlock, 'markDefs'> & {
    markDefs?: Maybe<Array<ResolversParentTypes['MarkDef']>>;
  };
  Token: Token;
  UpdateCartInput: UpdateCartInput;
  UpdateLineItemInput: UpdateLineItemInput;
};

export type AddressResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Address'] = ResolversParentTypes['Address'],
> = {
  address1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  metadata?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  province?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ApplicationMethodResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ApplicationMethod'] = ResolversParentTypes['ApplicationMethod'],
> = {
  currencyCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ApplicationType'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CartResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Cart'] = ResolversParentTypes['Cart'],
> = {
  billingAddress?: Resolver<
    Maybe<ResolversTypes['Address']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  currencyCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  discountTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  giftCardTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  itemTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<ResolversTypes['LineItem']>>,
    ParentType,
    ContextType
  >;
  originalTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  paymentCollection?: Resolver<
    Maybe<ResolversTypes['PaymentCollection']>,
    ParentType,
    ContextType
  >;
  promoCodes?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['String']>>>,
    ParentType,
    ContextType
  >;
  promotions?: Resolver<
    Array<Maybe<ResolversTypes['Promotion']>>,
    ParentType,
    ContextType
  >;
  region?: Resolver<Maybe<ResolversTypes['Region']>, ParentType, ContextType>;
  regionId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  shippingAddress?: Resolver<
    Maybe<ResolversTypes['Address']>,
    ParentType,
    ContextType
  >;
  shippingMethods?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ShippingMethod']>>>,
    ParentType,
    ContextType
  >;
  shippingTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  subtotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  taxTotal?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type CollectionResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Collection'] = ResolversParentTypes['Collection'],
> = {
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  products?: Resolver<
    Maybe<ResolversTypes['ProductList']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CompleteCartErrorResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['CompleteCartError'] = ResolversParentTypes['CompleteCartError'],
> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type CompleteCartErrorResultResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['CompleteCartErrorResult'] = ResolversParentTypes['CompleteCartErrorResult'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  error?: Resolver<
    Maybe<ResolversTypes['CompleteCartError']>,
    ParentType,
    ContextType
  >;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompleteCartOrderResultResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['CompleteCartOrderResult'] = ResolversParentTypes['CompleteCartOrderResult'],
> = {
  order?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompleteCartResponseResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['CompleteCartResponse'] = ResolversParentTypes['CompleteCartResponse'],
> = {
  __resolveType: TypeResolveFn<
    'CompleteCartErrorResult' | 'CompleteCartOrderResult',
    ParentType,
    ContextType
  >;
};

export type CountryResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Country'] = ResolversParentTypes['Country'],
> = {
  displayName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  iso2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CustomerResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Customer'] = ResolversParentTypes['Customer'],
> = {
  addresses?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['CustomerAddress']>>>,
    ParentType,
    ContextType
  >;
  companyName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  defaultBillingAddressId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  defaultShippingAddressId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type CustomerAddressResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['CustomerAddress'] = ResolversParentTypes['CustomerAddress'],
> = {
  address1?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  address2?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addressName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  city?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  company?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  countryCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  customerId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isDefaultBilling?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  isDefaultShipping?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  postalCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  province?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FileBlockResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['FileBlock'] = ResolversParentTypes['FileBlock'],
> = {
  _key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  asset?: Resolver<
    Maybe<ResolversTypes['SanityFileAsset']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FooterResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Footer'] = ResolversParentTypes['Footer'],
> = {
  copyright?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  poweredByCta?: Resolver<
    Maybe<ResolversTypes['RichText']>,
    ParentType,
    ContextType
  >;
  social?: Resolver<
    Maybe<Array<ResolversTypes['SocialLink']>>,
    ParentType,
    ContextType
  >;
  storeName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
};

export type IconLinkMarkResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['IconLinkMark'] = ResolversParentTypes['IconLinkMark'],
> = {
  _key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iconClass?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  iconComponent?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  iconFill?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  iconImage?: Resolver<
    Maybe<ResolversTypes['SanityImage']>,
    ParentType,
    ContextType
  >;
  iconType?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  iconUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageBlockResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ImageBlock'] = ResolversParentTypes['ImageBlock'],
> = {
  _key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  alt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  asset?: Resolver<
    Maybe<ResolversTypes['SanityImageAsset']>,
    ParentType,
    ContextType
  >;
  caption?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageDimensionsResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ImageDimensions'] = ResolversParentTypes['ImageDimensions'],
> = {
  aspectRatio?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ImageMetadataResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ImageMetadata'] = ResolversParentTypes['ImageMetadata'],
> = {
  dimensions?: Resolver<
    Maybe<ResolversTypes['ImageDimensions']>,
    ParentType,
    ContextType
  >;
  hasAlpha?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  isOpaque?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type LineItemResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['LineItem'] = ResolversParentTypes['LineItem'],
> = {
  cart?: Resolver<Maybe<ResolversTypes['Cart']>, ParentType, ContextType>;
  cartId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  originalTotal?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  productHandle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  productTitle?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  requiresShipping?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  thumbnail?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  unitPrice?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  variant?: Resolver<
    Maybe<ResolversTypes['ProductVariant']>,
    ParentType,
    ContextType
  >;
};

export type LinkMarkResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['LinkMark'] = ResolversParentTypes['LinkMark'],
> = {
  _key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  href?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  target?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LogoutResponseResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['LogoutResponse'] = ResolversParentTypes['LogoutResponse'],
> = {
  success?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
};

export type MarkDefResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['MarkDef'] = ResolversParentTypes['MarkDef'],
> = {
  __resolveType: TypeResolveFn<
    'IconLinkMark' | 'LinkMark',
    ParentType,
    ContextType
  >;
};

export type MutationResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  addShippingMethod?: Resolver<
    Maybe<ResolversTypes['Cart']>,
    ParentType,
    ContextType,
    RequireFields<MutationAddShippingMethodArgs, 'cartId' | 'optionId'>
  >;
  applyPromotions?: Resolver<
    Maybe<ResolversTypes['Cart']>,
    ParentType,
    ContextType,
    RequireFields<MutationApplyPromotionsArgs, 'cartId' | 'codes'>
  >;
  completeCart?: Resolver<
    Maybe<ResolversTypes['CompleteCartResponse']>,
    ParentType,
    ContextType,
    RequireFields<MutationCompleteCartArgs, 'cartId'>
  >;
  createCart?: Resolver<
    Maybe<ResolversTypes['Cart']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateCartArgs, 'data'>
  >;
  createLineItem?: Resolver<
    Maybe<ResolversTypes['Cart']>,
    ParentType,
    ContextType,
    RequireFields<MutationCreateLineItemArgs, 'cartId' | 'data'>
  >;
  deleteLineItem?: Resolver<
    ResolversTypes['StoreLineItemDeleteResponse'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteLineItemArgs, 'cartId' | 'lineItemId'>
  >;
  login?: Resolver<
    Maybe<ResolversTypes['Token']>,
    ParentType,
    ContextType,
    RequireFields<MutationLoginArgs, 'email' | 'password'>
  >;
  logout?: Resolver<
    Maybe<ResolversTypes['LogoutResponse']>,
    ParentType,
    ContextType
  >;
  transferCart?: Resolver<
    Maybe<ResolversTypes['Cart']>,
    ParentType,
    ContextType,
    RequireFields<MutationTransferCartArgs, 'cartId'>
  >;
  updateCart?: Resolver<
    Maybe<ResolversTypes['Cart']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateCartArgs, 'data' | 'id'>
  >;
  updateLineItem?: Resolver<
    Maybe<ResolversTypes['Cart']>,
    ParentType,
    ContextType,
    RequireFields<MutationUpdateLineItemArgs, 'cartId' | 'data' | 'lineItemId'>
  >;
};

export type OrderResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Order'] = ResolversParentTypes['Order'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  currencyCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  discountTotal?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  displayId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fulfillmentStatus?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  giftCardTotal?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes['LineItem']>, ParentType, ContextType>;
  paymentCollections?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['PaymentCollection']>>>,
    ParentType,
    ContextType
  >;
  paymentStatus?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  regionId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingAddress?: Resolver<
    Maybe<ResolversTypes['Address']>,
    ParentType,
    ContextType
  >;
  shippingMethods?: Resolver<
    Array<ResolversTypes['ShippingMethod']>,
    ParentType,
    ContextType
  >;
  shippingTotal?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subtotal?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  taxTotal?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type PaymentResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Payment'] = ResolversParentTypes['Payment'],
> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  currencyCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<Maybe<ResolversTypes['JSON']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  providerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type PaymentCollectionResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['PaymentCollection'] = ResolversParentTypes['PaymentCollection'],
> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  currencyCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentProviders?: Resolver<
    Array<Maybe<ResolversTypes['PaymentProviders']>>,
    ParentType,
    ContextType
  >;
  paymentSessions?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['PaymentSessions']>>>,
    ParentType,
    ContextType
  >;
  payments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Payment']>>>,
    ParentType,
    ContextType
  >;
  status?: Resolver<ResolversTypes['PaymentStatus'], ParentType, ContextType>;
};

export type PaymentProvidersResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['PaymentProviders'] = ResolversParentTypes['PaymentProviders'],
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type PaymentSessionsResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['PaymentSessions'] = ResolversParentTypes['PaymentSessions'],
> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  currencyCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  providerId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<
    ResolversTypes['PaymentSessionStatus'],
    ParentType,
    ContextType
  >;
};

export type PriceResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Price'] = ResolversParentTypes['Price'],
> = {
  amount?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  currencyCode?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  priceType?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
};

export type ProductResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Product'] = ResolversParentTypes['Product'],
> = {
  collection?: Resolver<
    Maybe<ResolversTypes['Collection']>,
    ParentType,
    ContextType
  >;
  collectionId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  height?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<
    Maybe<Array<ResolversTypes['ProductImage']>>,
    ParentType,
    ContextType
  >;
  length?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  material?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  options?: Resolver<
    Maybe<Array<ResolversTypes['ProductOption']>>,
    ParentType,
    ContextType
  >;
  originCountry?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  tags?: Resolver<
    Maybe<Array<ResolversTypes['ProductTag']>>,
    ParentType,
    ContextType
  >;
  thumbnail?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  variants?: Resolver<
    Maybe<Array<ResolversTypes['ProductVariant']>>,
    ParentType,
    ContextType
  >;
  weight?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
};

export type ProductCategoryResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ProductCategory'] = ResolversParentTypes['ProductCategory'],
> = {
  categoryChildren?: Resolver<
    Maybe<Array<ResolversTypes['ProductCategory']>>,
    ParentType,
    ContextType
  >;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  parentCategory?: Resolver<
    Maybe<ResolversTypes['ProductCategory']>,
    ParentType,
    ContextType
  >;
  products?: Resolver<
    Maybe<ResolversTypes['ProductList']>,
    ParentType,
    ContextType
  >;
};

export type ProductHitResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ProductHit'] = ResolversParentTypes['ProductHit'],
> = {
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  handle?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  thumbnail?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ProductImageResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ProductImage'] = ResolversParentTypes['ProductImage'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ProductListResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ProductList'] = ResolversParentTypes['ProductList'],
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<
    Maybe<Array<ResolversTypes['Product']>>,
    ParentType,
    ContextType
  >;
};

export type ProductListResponseResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ProductListResponse'] = ResolversParentTypes['ProductListResponse'],
> = {
  count?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  products?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Product']>>>,
    ParentType,
    ContextType
  >;
};

export type ProductOptionResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ProductOption'] = ResolversParentTypes['ProductOption'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  values?: Resolver<
    Array<ResolversTypes['ProductOptionValue']>,
    ParentType,
    ContextType
  >;
};

export type ProductOptionValueResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ProductOptionValue'] = ResolversParentTypes['ProductOptionValue'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ProductTagResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ProductTag'] = ResolversParentTypes['ProductTag'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type ProductVariantResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ProductVariant'] = ResolversParentTypes['ProductVariant'],
> = {
  allowBackorder?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inventoryQuantity?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >;
  manageInventory?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
  options?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['ProductVariantOption']>>>,
    ParentType,
    ContextType
  >;
  originalPrice?: Resolver<
    Maybe<ResolversTypes['Price']>,
    ParentType,
    ContextType
  >;
  price?: Resolver<Maybe<ResolversTypes['Price']>, ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  sku?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type ProductVariantOptionResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ProductVariantOption'] = ResolversParentTypes['ProductVariantOption'],
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  optionId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type PromotionResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Promotion'] = ResolversParentTypes['Promotion'],
> = {
  applicationMethod?: Resolver<
    Maybe<ResolversTypes['ApplicationMethod']>,
    ParentType,
    ContextType
  >;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isAutomatic?: Resolver<
    Maybe<ResolversTypes['Boolean']>,
    ParentType,
    ContextType
  >;
};

export type QueryResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  cart?: Resolver<
    Maybe<ResolversTypes['Cart']>,
    ParentType,
    ContextType,
    RequireFields<QueryCartArgs, 'id'>
  >;
  collection?: Resolver<
    Maybe<ResolversTypes['Collection']>,
    ParentType,
    ContextType,
    RequireFields<QueryCollectionArgs, 'id'>
  >;
  collections?: Resolver<
    Array<ResolversTypes['Collection']>,
    ParentType,
    ContextType,
    Partial<QueryCollectionsArgs>
  >;
  footer?: Resolver<Maybe<ResolversTypes['Footer']>, ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  product?: Resolver<
    Maybe<ResolversTypes['Product']>,
    ParentType,
    ContextType,
    RequireFields<QueryProductArgs, 'id'>
  >;
  productCategories?: Resolver<
    Array<ResolversTypes['ProductCategory']>,
    ParentType,
    ContextType,
    Partial<QueryProductCategoriesArgs>
  >;
  productCategory?: Resolver<
    Maybe<ResolversTypes['ProductCategory']>,
    ParentType,
    ContextType,
    RequireFields<QueryProductCategoryArgs, 'id'>
  >;
  products?: Resolver<
    ResolversTypes['ProductListResponse'],
    ParentType,
    ContextType,
    Partial<QueryProductsArgs>
  >;
  searchProducts?: Resolver<
    ResolversTypes['SearchProducts'],
    ParentType,
    ContextType,
    Partial<QuerySearchProductsArgs>
  >;
};

export type RegionResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Region'] = ResolversParentTypes['Region'],
> = {
  countries?: Resolver<
    Maybe<Array<Maybe<ResolversTypes['Country']>>>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  currencyCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type RichTextResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['RichText'] = ResolversParentTypes['RichText'],
> = {
  text?: Resolver<
    Array<ResolversTypes['RichTextBlock']>,
    ParentType,
    ContextType
  >;
};

export type RichTextBlockResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['RichTextBlock'] = ResolversParentTypes['RichTextBlock'],
> = {
  __resolveType: TypeResolveFn<
    'FileBlock' | 'ImageBlock' | 'TextBlock',
    ParentType,
    ContextType
  >;
};

export type SanityFileAssetResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['SanityFileAsset'] = ResolversParentTypes['SanityFileAsset'],
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  mimeType?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  originalFilename?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SanityImageResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['SanityImage'] = ResolversParentTypes['SanityImage'],
> = {
  alt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  asset?: Resolver<
    Maybe<ResolversTypes['SanityImageAsset']>,
    ParentType,
    ContextType
  >;
  caption?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type SanityImageAssetResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['SanityImageAsset'] = ResolversParentTypes['SanityImageAsset'],
> = {
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  metadata?: Resolver<
    Maybe<ResolversTypes['ImageMetadata']>,
    ParentType,
    ContextType
  >;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SearchProductsResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['SearchProducts'] = ResolversParentTypes['SearchProducts'],
> = {
  hitsPerPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  items?: Resolver<
    Array<ResolversTypes['ProductHit']>,
    ParentType,
    ContextType
  >;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  params?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  query?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalPages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
};

export type ShippingMethodResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['ShippingMethod'] = ResolversParentTypes['ShippingMethod'],
> = {
  amount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cartId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shippingOptionId?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  total?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
};

export type SocialLinkResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['SocialLink'] = ResolversParentTypes['SocialLink'],
> = {
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type SpanResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Span'] = ResolversParentTypes['Span'],
> = {
  _key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  marks?: Resolver<
    Maybe<Array<ResolversTypes['String']>>,
    ParentType,
    ContextType
  >;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type StoreLineItemDeleteResponseResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['StoreLineItemDeleteResponse'] = ResolversParentTypes['StoreLineItemDeleteResponse'],
> = {
  deleted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  object?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type TextBlockResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['TextBlock'] = ResolversParentTypes['TextBlock'],
> = {
  _key?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  _type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  children?: Resolver<Array<ResolversTypes['Span']>, ParentType, ContextType>;
  level?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  listItem?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  markDefs?: Resolver<
    Maybe<Array<ResolversTypes['MarkDef']>>,
    ParentType,
    ContextType
  >;
  style?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokenResolvers<
  ContextType = GraphQLContext,
  ParentType extends
    ResolversParentTypes['Token'] = ResolversParentTypes['Token'],
> = {
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = GraphQLContext> = {
  Address?: AddressResolvers<ContextType>;
  ApplicationMethod?: ApplicationMethodResolvers<ContextType>;
  Cart?: CartResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  CompleteCartError?: CompleteCartErrorResolvers<ContextType>;
  CompleteCartErrorResult?: CompleteCartErrorResultResolvers<ContextType>;
  CompleteCartOrderResult?: CompleteCartOrderResultResolvers<ContextType>;
  CompleteCartResponse?: CompleteCartResponseResolvers<ContextType>;
  Country?: CountryResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerAddress?: CustomerAddressResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  FileBlock?: FileBlockResolvers<ContextType>;
  Footer?: FooterResolvers<ContextType>;
  IconLinkMark?: IconLinkMarkResolvers<ContextType>;
  ImageBlock?: ImageBlockResolvers<ContextType>;
  ImageDimensions?: ImageDimensionsResolvers<ContextType>;
  ImageMetadata?: ImageMetadataResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  LineItem?: LineItemResolvers<ContextType>;
  LinkMark?: LinkMarkResolvers<ContextType>;
  LogoutResponse?: LogoutResponseResolvers<ContextType>;
  MarkDef?: MarkDefResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  PaymentCollection?: PaymentCollectionResolvers<ContextType>;
  PaymentProviders?: PaymentProvidersResolvers<ContextType>;
  PaymentSessions?: PaymentSessionsResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductCategory?: ProductCategoryResolvers<ContextType>;
  ProductHit?: ProductHitResolvers<ContextType>;
  ProductImage?: ProductImageResolvers<ContextType>;
  ProductList?: ProductListResolvers<ContextType>;
  ProductListResponse?: ProductListResponseResolvers<ContextType>;
  ProductOption?: ProductOptionResolvers<ContextType>;
  ProductOptionValue?: ProductOptionValueResolvers<ContextType>;
  ProductTag?: ProductTagResolvers<ContextType>;
  ProductVariant?: ProductVariantResolvers<ContextType>;
  ProductVariantOption?: ProductVariantOptionResolvers<ContextType>;
  Promotion?: PromotionResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Region?: RegionResolvers<ContextType>;
  RichText?: RichTextResolvers<ContextType>;
  RichTextBlock?: RichTextBlockResolvers<ContextType>;
  SanityFileAsset?: SanityFileAssetResolvers<ContextType>;
  SanityImage?: SanityImageResolvers<ContextType>;
  SanityImageAsset?: SanityImageAssetResolvers<ContextType>;
  SearchProducts?: SearchProductsResolvers<ContextType>;
  ShippingMethod?: ShippingMethodResolvers<ContextType>;
  SocialLink?: SocialLinkResolvers<ContextType>;
  Span?: SpanResolvers<ContextType>;
  StoreLineItemDeleteResponse?: StoreLineItemDeleteResponseResolvers<ContextType>;
  TextBlock?: TextBlockResolvers<ContextType>;
  Token?: TokenResolvers<ContextType>;
};

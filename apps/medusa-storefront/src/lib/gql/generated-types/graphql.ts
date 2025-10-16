import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  JSON: { input: any; output: any; }
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

export type Mutation = {
  __typename?: 'Mutation';
  login?: Maybe<Token>;
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
  allowBackorder: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  inventoryQuantity?: Maybe<Scalars['Int']['output']>;
  manageInventory: Scalars['Boolean']['output'];
  options: Array<ProductVariantOption>;
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

export type Query = {
  __typename?: 'Query';
  collection?: Maybe<Collection>;
  collections: Array<Collection>;
  me?: Maybe<Customer>;
  product?: Maybe<Product>;
  productCategories: Array<ProductCategory>;
  productCategory?: Maybe<ProductCategory>;
  products: ProductListResponse;
};


export type Query_CollectionArgs = {
  id: Scalars['ID']['input'];
};


export type Query_CollectionsArgs = {
  handle?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
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

export type Token = {
  __typename?: 'Token';
  token?: Maybe<Scalars['String']['output']>;
};

export type CustomerAddressFragment = { __typename?: 'CustomerAddress', id: string, addressName?: string | null, isDefaultShipping?: boolean | null, isDefaultBilling?: boolean | null, customerId?: string | null, company?: string | null, firstName?: string | null, lastName?: string | null, address1?: string | null, address2?: string | null, city?: string | null, countryCode?: string | null, province?: string | null, postalCode?: string | null, phone?: string | null };

export type CustomerFragment = { __typename?: 'Customer', id: string, email?: string | null, defaultBillingAddressId?: string | null, defaultShippingAddressId?: string | null, companyName?: string | null, firstName?: string | null, lastName?: string | null, phone?: string | null, addresses?: Array<(
    { __typename?: 'CustomerAddress' }
    & CustomerAddressFragment
  ) | null> | null };

export type ProductImageFragment = { __typename?: 'ProductImage', id: string, url: string };

export type ProductTagFragment = { __typename?: 'ProductTag', id: string };

export type ProductOptionFragment = { __typename?: 'ProductOption', id: string, title: string, values: Array<{ __typename?: 'ProductOptionValue', id: string, value: string }> };

export type PriceFragment = { __typename?: 'Price', amount?: number | null, currencyCode?: string | null, priceType?: string | null };

export type ProductVariantFragment = { __typename?: 'ProductVariant', id: string, sku?: string | null, inventoryQuantity?: number | null, allowBackorder: boolean, manageInventory: boolean, options: Array<{ __typename?: 'ProductVariantOption', id: string, optionId: string, value: string }>, price?: (
    { __typename?: 'Price' }
    & PriceFragment
  ) | null, originalPrice?: (
    { __typename?: 'Price' }
    & PriceFragment
  ) | null };

export type ProductCategoryFragment = { __typename?: 'ProductCategory', id: string, name: string, description?: string | null, handle: string };

export type ProductCollectionFragment = { __typename?: 'Collection', id: string, title: string, handle: string };

export type ProductFragment = { __typename?: 'Product', id: string, title: string, handle: string, description?: string | null, thumbnail?: string | null, width?: number | null, weight?: number | null, length?: number | null, height?: number | null, originCountry?: string | null, material?: string | null, type?: string | null, collectionId?: string | null, createdAt: any, images?: Array<(
    { __typename?: 'ProductImage' }
    & ProductImageFragment
  )> | null, tags?: Array<(
    { __typename?: 'ProductTag' }
    & ProductTagFragment
  )> | null, options?: Array<(
    { __typename?: 'ProductOption' }
    & ProductOptionFragment
  )> | null, variants?: Array<(
    { __typename?: 'ProductVariant' }
    & ProductVariantFragment
  )> | null, collection?: (
    { __typename?: 'Collection' }
    & ProductCollectionFragment
  ) | null };

export type CollectionProductsFragment = { __typename?: 'ProductList', count: number, items?: Array<{ __typename?: 'Product', id: string, title: string, handle: string, thumbnail?: string | null, images?: Array<(
      { __typename?: 'ProductImage' }
      & ProductImageFragment
    )> | null, variants?: Array<{ __typename?: 'ProductVariant', price?: (
        { __typename?: 'Price' }
        & PriceFragment
      ) | null, originalPrice?: (
        { __typename?: 'Price' }
        & PriceFragment
      ) | null }> | null }> | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login?: { __typename?: 'Token', token?: string | null } | null };

export type GetCustomerQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCustomerQuery = { __typename?: 'Query', me?: (
    { __typename?: 'Customer' }
    & CustomerFragment
  ) | null };

export type GetProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  region_id?: InputMaybe<Scalars['String']['input']>;
  category_id?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  collection_id?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
  q?: InputMaybe<Scalars['String']['input']>;
  is_giftcard?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Array<Scalars['ID']['input']> | Scalars['ID']['input']>;
  tag_id?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type GetProductsQuery = { __typename?: 'Query', products: { __typename?: 'ProductListResponse', count: number, products?: Array<(
      { __typename?: 'Product' }
      & ProductFragment
    ) | null> | null } };

export type GetProductQueryVariables = Exact<{
  id: Scalars['ID']['input'];
  region_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductQuery = { __typename?: 'Query', product?: (
    { __typename?: 'Product' }
    & ProductFragment
  ) | null };

export type GetProductCategoriesQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  q?: InputMaybe<Scalars['String']['input']>;
  handle?: InputMaybe<Scalars['String']['input']>;
  parent_category_id?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetProductCategoriesQuery = { __typename?: 'Query', productCategories: Array<(
    { __typename?: 'ProductCategory', parentCategory?: (
      { __typename?: 'ProductCategory' }
      & ProductCategoryFragment
    ) | null, categoryChildren?: Array<(
      { __typename?: 'ProductCategory' }
      & ProductCategoryFragment
    )> | null, products?: { __typename?: 'ProductList', count: number } | null }
    & ProductCategoryFragment
  )> };

export type GetProductCategoryQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetProductCategoryQuery = { __typename?: 'Query', productCategory?: (
    { __typename?: 'ProductCategory', parentCategory?: (
      { __typename?: 'ProductCategory', parentCategory?: (
        { __typename?: 'ProductCategory' }
        & ProductCategoryFragment
      ) | null }
      & ProductCategoryFragment
    ) | null, categoryChildren?: Array<(
      { __typename?: 'ProductCategory' }
      & ProductCategoryFragment
    )> | null, products?: { __typename?: 'ProductList', count: number } | null }
    & ProductCategoryFragment
  ) | null };

export type GetCollectionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetCollectionsQuery = { __typename?: 'Query', collections: Array<(
    { __typename?: 'Collection', products?: (
      { __typename?: 'ProductList' }
      & CollectionProductsFragment
    ) | null }
    & ProductCollectionFragment
  )> };

export type GetCollectionsSummaryQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  handle?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>> | InputMaybe<Scalars['String']['input']>>;
}>;


export type GetCollectionsSummaryQuery = { __typename?: 'Query', collections: Array<(
    { __typename?: 'Collection', products?: { __typename?: 'ProductList', count: number } | null }
    & ProductCollectionFragment
  )> };

export type GetCollectionQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCollectionQuery = { __typename?: 'Query', collection?: (
    { __typename?: 'Collection', products?: (
      { __typename?: 'ProductList' }
      & CollectionProductsFragment
    ) | null }
    & ProductCollectionFragment
  ) | null };

export const CustomerAddressFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerAddress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerAddress"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressName"}},{"kind":"Field","name":{"kind":"Name","value":"isDefaultShipping"}},{"kind":"Field","name":{"kind":"Name","value":"isDefaultBilling"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]} as unknown as DocumentNode<CustomerAddressFragment, unknown>;
export const CustomerFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Customer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Customer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"defaultBillingAddressId"}},{"kind":"Field","name":{"kind":"Name","value":"defaultShippingAddressId"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomerAddress"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerAddress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerAddress"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressName"}},{"kind":"Field","name":{"kind":"Name","value":"isDefaultShipping"}},{"kind":"Field","name":{"kind":"Name","value":"isDefaultBilling"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}}]} as unknown as DocumentNode<CustomerFragment, unknown>;
export const ProductCategoryFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<ProductCategoryFragment, unknown>;
export const ProductImageFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<ProductImageFragment, unknown>;
export const ProductTagFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductTag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductTag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]} as unknown as DocumentNode<ProductTagFragment, unknown>;
export const ProductOptionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<ProductOptionFragment, unknown>;
export const PriceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Price"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}}]}}]} as unknown as DocumentNode<PriceFragment, unknown>;
export const ProductVariantFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductVariant"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"inventoryQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"allowBackorder"}},{"kind":"Field","name":{"kind":"Name","value":"manageInventory"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Price"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}}]}}]} as unknown as DocumentNode<ProductVariantFragment, unknown>;
export const ProductCollectionFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<ProductCollectionFragment, unknown>;
export const ProductFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Product"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"originCountry"}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"collectionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductTag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductOption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductVariant"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCollection"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductTag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductTag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Price"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductVariant"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"inventoryQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"allowBackorder"}},{"kind":"Field","name":{"kind":"Name","value":"manageInventory"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<ProductFragment, unknown>;
export const CollectionProductsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionProducts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Price"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}}]}}]} as unknown as DocumentNode<CollectionProductsFragment, unknown>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"Argument","name":{"kind":"Name","value":"password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"password"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const GetCustomerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCustomer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"me"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Customer"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CustomerAddress"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CustomerAddress"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"addressName"}},{"kind":"Field","name":{"kind":"Name","value":"isDefaultShipping"}},{"kind":"Field","name":{"kind":"Name","value":"isDefaultBilling"}},{"kind":"Field","name":{"kind":"Name","value":"customerId"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"address1"}},{"kind":"Field","name":{"kind":"Name","value":"address2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"province"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Customer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Customer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"defaultBillingAddressId"}},{"kind":"Field","name":{"kind":"Name","value":"defaultShippingAddressId"}},{"kind":"Field","name":{"kind":"Name","value":"companyName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phone"}},{"kind":"Field","name":{"kind":"Name","value":"addresses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CustomerAddress"}}]}}]}}]} as unknown as DocumentNode<GetCustomerQuery, GetCustomerQueryVariables>;
export const GetProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProducts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"handle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category_id"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collection_id"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"is_giftcard"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag_id"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"handle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"handle"}}},{"kind":"Argument","name":{"kind":"Name","value":"region_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"collection_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collection_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"q"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"is_giftcard"},"value":{"kind":"Variable","name":{"kind":"Name","value":"is_giftcard"}}},{"kind":"Argument","name":{"kind":"Name","value":"tag_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Product"}}]}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductTag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductTag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Price"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductVariant"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"inventoryQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"allowBackorder"}},{"kind":"Field","name":{"kind":"Name","value":"manageInventory"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Product"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"originCountry"}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"collectionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductTag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductOption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductVariant"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCollection"}}]}}]}}]} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProduct"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"region_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"product"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"region_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"region_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Product"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductTag"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductTag"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductOption"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductOption"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"values"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Price"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductVariant"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductVariant"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"sku"}},{"kind":"Field","name":{"kind":"Name","value":"inventoryQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"allowBackorder"}},{"kind":"Field","name":{"kind":"Name","value":"manageInventory"}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"optionId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Product"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Product"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"weight"}},{"kind":"Field","name":{"kind":"Name","value":"length"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"originCountry"}},{"kind":"Field","name":{"kind":"Name","value":"material"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"collectionId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductTag"}}]}},{"kind":"Field","name":{"kind":"Name","value":"options"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductOption"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductVariant"}}]}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCollection"}}]}}]}}]} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const GetProductCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductCategories"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"q"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"handle"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"parent_category_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCategories"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"q"},"value":{"kind":"Variable","name":{"kind":"Name","value":"q"}}},{"kind":"Argument","name":{"kind":"Name","value":"handle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"handle"}}},{"kind":"Argument","name":{"kind":"Name","value":"parent_category_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"parent_category_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}},{"kind":"Field","name":{"kind":"Name","value":"categoryChildren"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<GetProductCategoriesQuery, GetProductCategoriesQueryVariables>;
export const GetProductCategoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetProductCategory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"productCategory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}},{"kind":"Field","name":{"kind":"Name","value":"parentCategory"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"categoryChildren"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCategory"}}]}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<GetProductCategoryQuery, GetProductCategoryQueryVariables>;
export const GetCollectionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollections"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCollection"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionProducts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Price"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionProducts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCollectionsQuery, GetCollectionsQueryVariables>;
export const GetCollectionsSummaryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollectionsSummary"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"handle"}},"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collections"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"handle"},"value":{"kind":"Variable","name":{"kind":"Name","value":"handle"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCollection"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}}]} as unknown as DocumentNode<GetCollectionsSummaryQuery, GetCollectionsSummaryQueryVariables>;
export const GetCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"collection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductCollection"}},{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CollectionProducts"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductImage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductImage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Price"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Price"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"priceType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProductCollection"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Collection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"CollectionProducts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProductList"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"handle"}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"}},{"kind":"Field","name":{"kind":"Name","value":"images"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProductImage"}}]}},{"kind":"Field","name":{"kind":"Name","value":"variants"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalPrice"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Price"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetCollectionQuery, GetCollectionQueryVariables>;
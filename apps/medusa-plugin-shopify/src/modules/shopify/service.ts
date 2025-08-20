import { logger } from '@medusajs/framework';
import { MedusaError } from '@medusajs/framework/utils';

import { ShopifyCollection, ShopifyProduct } from './types';

type Options = {
  baseUrl: string;
};

export default class ShopifyModuleService {
  private options: Options;

  constructor(_, options: Options) {
    this.options = { ...options };
  }

  async getProducts(options?: {
    page?: number;
    limit?: number;
  }): Promise<{ products: ShopifyProduct[]; page?: number }> {
    const { page, limit } = { ...options };
    const searchQuery = new URLSearchParams();

    if (page) searchQuery.append('page', page?.toString());
    if (limit) searchQuery.append('limit', limit.toString());

    const { products } = await fetch(
      `${this.options.baseUrl}/products.json?${searchQuery}`
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `Failed to get products from Shopify: ${err.message}`
        );
      });

    return { products, page };
  }

  async getCollections(options?: {
    page?: number;
    limit?: number;
  }): Promise<{ collections: ShopifyCollection[]; page?: number }> {
    const { page, limit } = { ...options };
    const searchQuery = new URLSearchParams();

    if (page) searchQuery.append('page', page?.toString());
    if (limit) searchQuery.append('limit', limit.toString());

    const { collections } = await fetch(
      `${this.options.baseUrl}/collections.json?${searchQuery}`
    )
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          `Failed to get collections from Shopify: ${err.message}`
        );
      });

    return { collections, page };
  }

  async getProductsInCollection(options?: {
    collectionHandle: string;
    page?: number;
    limit?: number;
  }): Promise<{
    collectionProductsSet: {
      collectionHandle?: string;
      products: ShopifyProduct[];
    };
    page?: number;
  }> {
    try {
      const { collectionHandle, page, limit } = { ...options };

      const searchQuery = new URLSearchParams();

      if (page) searchQuery.append('page', page?.toString());
      if (limit) searchQuery.append('limit', limit.toString());

      const { products: productsInCollection } = await fetch(
        `${this.options.baseUrl}/collections/${collectionHandle}/products.json?${searchQuery}`
      )
        .then((res) => res.json())
        .catch((err) => {
          console.log(err);
          throw new MedusaError(
            MedusaError.Types.INVALID_DATA,
            `Failed to get products from collection ${collectionHandle} from Shopify: ${err.message}`
          );
        });

      logger.info(
        `Retrieved ${productsInCollection.length} products in collection ${collectionHandle}`
      );

      return {
        collectionProductsSet: {
          collectionHandle,
          products: productsInCollection,
        },
        page,
      };
    } catch (e) {
      logger.error('ERROR: Failed to get list of products in collection', e);
      return { collectionProductsSet: { products: [] } };
    }
  }

  async getProductsInCollections(options?: {
    collectionHandles: string[];
    page?: number;
    limit?: number;
  }): Promise<{
    collectionProductsSet: {
      collectionHandle: string;
      products: ShopifyProduct[];
    }[];
    page?: number;
  }> {
    try {
      const { collectionHandles, page, limit } = { ...options };

      const searchQuery = new URLSearchParams();

      if (page) searchQuery.append('page', page?.toString());
      if (limit) searchQuery.append('limit', limit.toString());

      const promises = collectionHandles?.map(async (collectionHandle) => {
        const { products: productsInCollection } = await fetch(
          `${this.options.baseUrl}/collections/${collectionHandle}/products.json?${searchQuery}`
        )
          .then((res) => res.json())
          .catch((err) => {
            console.log(err);
            throw new MedusaError(
              MedusaError.Types.INVALID_DATA,
              `Failed to get products from collection ${collectionHandle} from Shopify: ${err.message}`
            );
          });

        logger.info(
          `Retrieved ${productsInCollection.length} products in collection ${collectionHandle}`
        );

        return {
          collectionHandle,
          products: productsInCollection,
        };
      });

      if (!promises) return { collectionProductsSet: [] };

      const results = await Promise.all(promises);

      return { collectionProductsSet: results, page };
    } catch (e) {
      logger.error('ERROR: Failed to get list of products in collection', e);
      return { collectionProductsSet: [] };
    }
  }
}

import { logger } from '@medusajs/framework';
import {
  type ProductCollectionDTO,
  ProductDTO,
} from '@medusajs/framework/types';
import { StepResponse, createStep } from '@medusajs/framework/workflows-sdk';

import { ShopifyProduct } from '../../modules/shopify/types';

type MapProductIdsToCollectionsInput = {
  existingCollections: ProductCollectionDTO[];
  existingProducts: ProductDTO[];
  shopifyCollectionProductsSet: {
    collectionHandle: string;
    products: ShopifyProduct[];
  }[];
};

export const mapProductIdsToCollectionsStep = createStep(
  'map-product-ids-to-collections',
  async (
    {
      existingCollections,
      existingProducts,
      shopifyCollectionProductsSet,
    }: MapProductIdsToCollectionsInput,
    { container }
  ) => {
    const productsToCollectionMapping = existingCollections.map(
      (existingCollection) => {
        const productsInCollection = existingProducts
          .filter((eP) =>
            shopifyCollectionProductsSet.find(
              (shopifyCollection) =>
                shopifyCollection.collectionHandle ===
                  existingCollection.handle &&
                shopifyCollection.products.find(
                  (p) => p.id.toString() === eP.external_id
                )
            )
          )
          .map((eP: ProductDTO) => eP.id);

        logger.info(
          `Mapping collection ${existingCollection.id} to products [${productsInCollection.slice(0, 10).join(', ')}]`
        );

        return {
          existingCollection,
          productsInCollection: productsInCollection.slice(0, 10),
        };
      }
    );

    return new StepResponse(productsToCollectionMapping);
  }
);

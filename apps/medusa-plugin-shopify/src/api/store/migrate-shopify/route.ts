import { logger } from '@medusajs/framework';
import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';

import { linkProductToCollectionWorkflow } from '../../../workflows/link-product-to-collection';
import { migrateCollectionsFromShopifyWorkflow } from '../../../workflows/migrate-collections-from-shopify';
import { migrateProductsFromShopifyWorkflow } from '../../../workflows/migrate-products-from-shopify';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const container = req.scope;
    const productsLimit = 250;
    let productsResultsCount = 0;
    let productsPage = 0;

    logger.info('Migrating products from Shopify...');

    do {
      productsPage++;

      const {
        result: { pageLength },
      } = await migrateProductsFromShopifyWorkflow(container).run({
        input: {
          page: productsPage,
          limit: productsLimit,
        },
      });

      productsResultsCount = pageLength;
    } while (productsLimit <= productsResultsCount);

    logger.info('Finished migrating products!');
    logger.info('Migrating collections from Shopify...');

    const collectionsLimit = 250;
    let collectionsPage = 0;
    let collectionsResultsCount = 0;

    do {
      const {
        result: { pageResults: collectionsPageResultCount },
      } = await migrateCollectionsFromShopifyWorkflow(container).run({
        input: {
          limit: collectionsLimit,
          page: collectionsPage,
        },
      });

      collectionsPage++;
      collectionsResultsCount = collectionsPageResultCount;
    } while (collectionsLimit <= collectionsResultsCount);

    logger.info('Finished migrating collections!');
    logger.info('Linking products to collections...');

    const linkingLimit = 250;
    let linkingPage = 0;
    let currentCollection: any = {};

    do {
      const {
        result: { page: linkingPageResult, collection },
      } = await linkProductToCollectionWorkflow(container).run({
        input: {
          page: linkingPage,
        },
      });

      linkingPage = linkingPageResult + 1;
      currentCollection = collection;
    } while (
      linkingPage <= linkingLimit &&
      Boolean(currentCollection) &&
      Boolean(currentCollection?.handle)
    );

    logger.info('Finished linking products to collections!');

    res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    res.sendStatus(500);
  }
}

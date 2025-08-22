import { SubscriberArgs, type SubscriberConfig } from '@medusajs/framework';

import { migrateProductsFromShopifyWorkflow } from '../workflows/migrate-products-from-shopify';

export default async function migrateShopifyHandler({
  container,
}: SubscriberArgs) {
  const logger = container.resolve('logger');
  logger.info('Migrating products from Shopify...');

  let currentPage = 0;
  const pageSize = 10;
  const totalCount = 50; // only migrate 30 products for now

  do {
    currentPage++;

    await migrateProductsFromShopifyWorkflow(container).run({
      input: {
        page: currentPage,
        limit: pageSize,
      },
    });
  } while (currentPage * pageSize < totalCount);

  logger.info('Finished migrating products from Shopify');
}

export const config: SubscriberConfig = {
  event: 'migrate-products.shopify',
};

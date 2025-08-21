import { MedusaContainer } from '@medusajs/framework/types';

import { migrateProductsFromShopifyWorkflow } from '../workflows/migrate-products-from-shopify';

export default async function migrateShopifyJob(container: MedusaContainer) {
  const logger = container.resolve('logger');
  logger.info('Migrating products from Shopify...');

  let currentPage = 0;
  const pageSize = 10;
  const totalCount = 50; // only migrate 30 products for now

  do {
    currentPage++;

    const { result: pagination } = await migrateProductsFromShopifyWorkflow(
      container
    ).run({
      input: {
        page: currentPage,
        limit: pageSize,
      },
    });
  } while (currentPage * pageSize < totalCount);

  logger.info('Finished migrating products from Shopify');
}

export const config = {
  name: 'migrate-shopify-job',
  schedule: '0 0 * * *',
  // schedule: '* * * * *', // runs every minute for testing purposes
};

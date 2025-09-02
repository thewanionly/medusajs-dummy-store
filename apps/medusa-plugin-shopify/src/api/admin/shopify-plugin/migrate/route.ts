import type { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import {
  ContainerRegistrationKeys,
  MedusaError,
} from '@medusajs/framework/utils';

import { linkProductsToCollectionWorkflow } from '../../../../workflows/link-products-to-collection';
import { migrateShopifyDataWorkflow } from '../../../../workflows/migrate';

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const container = req.scope;
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const activityId = logger.activity('Migrating all data from Shopify...');

  try {
    const {
      result: { collections },
    } = await migrateShopifyDataWorkflow(container).run();

    logger.progress(activityId, 'Linking Products to Product Collections...');

    // Process collections sequentially to prevent being rate-limited
    for (const collection of collections) {
      await linkProductsToCollectionWorkflow(container).run({
        input: { collection },
      });
    }

    logger.success(activityId, 'Finished migrating all data from Shopify!');

    res.sendStatus(200);
  } catch (e) {
    logger.failure(
      activityId,
      'Failed to migrate Shopify data to Medusa database'
    );

    throw new MedusaError(
      MedusaError.Types.UNEXPECTED_STATE,
      'Failed to migrate Shopify data into Medusa',
      e
    );
  }
}

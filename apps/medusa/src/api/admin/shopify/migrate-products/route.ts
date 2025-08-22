import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { Modules } from '@medusajs/framework/utils';

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const eventModuleService = req.scope.resolve(Modules.EVENT_BUS);
  await eventModuleService.emit({
    name: 'migrate-products.shopify',
    data: {},
  });
  res.send({
    message: 'Migrating products from Shopify to Medusa',
  });
}

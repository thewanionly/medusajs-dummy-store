import { MedusaRequest, MedusaResponse } from '@medusajs/framework/http';
import { ContainerRegistrationKeys } from '@medusajs/framework/utils';

import ProductProductExtendedLink from '../../../links/product-productExtended';

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve(ContainerRegistrationKeys.QUERY);

  console.log('### req.query', req.query);

  const vendor = req.query?.vendor;

  if (vendor) {
    // Support `vendor` custom property START

    // Step 1: Get all product_extended IDs that have `vendor` equal to the value in the request query
    const { data: productExtendedData } = await query.graph({
      entity: 'product_extended',
      fields: ['*'],
      filters: {
        vendor: vendor.toString(),
      },
    });

    const productExtendedIds = productExtendedData.map(({ id }) => id);

    // Step 2: Get all product IDs that are linked to the productExtendedIds
    const { data: productAndProductExtendedLinkData } = await query.graph({
      entity: ProductProductExtendedLink.entryPoint,
      fields: ['*', 'product.*', 'product_extended.*'],
      filters: {
        product_extended_id: productExtendedIds,
      },
    });

    const productIds = productAndProductExtendedLinkData.map(
      ({ product }) => product.id
    );

    // Step 3: Get all products that have the specified productIds
    const { data: products } = await query.graph({
      entity: 'product',
      fields: ['*', 'product_extended.*'],
      filters: { id: productIds },
    });

    res.json({
      products,
    });

    return;
  }

  const { data: products } = await query.graph({
    entity: 'product',
    fields: ['*'],
  });

  res.json({
    products,
  });
};

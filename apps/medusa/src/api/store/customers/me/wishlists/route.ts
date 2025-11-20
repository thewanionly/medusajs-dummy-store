import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from '@medusajs/framework/http';
import { MedusaError } from '@medusajs/framework/utils';

import { createWishlistWorkflow } from '@/workflows/wishlist/create-wishlist';

export async function POST(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  if (!req.publishable_key_context?.sales_channel_ids.length) {
    throw new MedusaError(
      MedusaError.Types.INVALID_DATA,
      'At least one sales channel ID is required to be associated with the publishable API key in the request header.'
    );
  }
  const { result } = await createWishlistWorkflow(req.scope).run({
    input: {
      customer_id: req.auth_context.actor_id,
      sales_channel_id: req.publishable_key_context?.sales_channel_ids[0],
    },
  });

  res.json({
    wishlist: result.wishlist,
  });
}

export async function GET(
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) {
  const query = req.scope.resolve('query');

  const { data } = await query.graph({
    entity: 'wishlist',
    fields: [
      '*',
      'items.*',
      'items.product_variant.*',
      'items.product_variant.product.*',
      'items.product_variant.product.options.*',
      'items.product_variant.product.options.values.*',
      'items.product_variant.product.variants.*',
      'items.product_variant.product.variants.options.*',
      'items.product_variant.product.images.*',
      'items.product_variant.product.tags.*',
      'items.product_variant.product.collection.*',
    ],
    filters: {
      customer_id: req.auth_context.actor_id,
    },
  });

  if (!data.length) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      'No wishlist found for customer'
    );
  }

  return res.json({
    wishlist: data[0],
  });
}

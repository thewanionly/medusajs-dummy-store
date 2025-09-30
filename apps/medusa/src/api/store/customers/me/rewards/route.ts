import {
  AuthenticatedMedusaRequest,
  MedusaResponse,
} from '@medusajs/framework';

import { LOYALTY_MODULE } from '../../../../../modules/loyalty';

export const GET = async (
  req: AuthenticatedMedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve('query');
  const loyaltyModuleService = req.scope.resolve(LOYALTY_MODULE);

  const loyaltyPoints = await loyaltyModuleService.getPoints(
    req.auth_context.actor_id
  );

  const { data: rewards, metadata } = await query.graph({
    entity: 'reward',
    fields: ['*', 'product.*'],
    filters: {
      points_cost: {
        $lte: loyaltyPoints.points,
      },
    },
  });

  const { skip, take, count } = { ...metadata };

  res.json({ rewards, skip, take, count });
};

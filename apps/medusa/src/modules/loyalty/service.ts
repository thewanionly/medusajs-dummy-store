import { InferTypeOf } from '@medusajs/framework/types';
import { MedusaError, MedusaService } from '@medusajs/framework/utils';

import LoyaltyPoint from './models/loyalty-point';

type LoyaltyPoint = InferTypeOf<typeof LoyaltyPoint>;

type LoyaltyOptions = {
  conversionRate: number;
};

const DEFAULT_LOYALTY_OPTIONS: LoyaltyOptions = {
  conversionRate: 10,
};

class LoyaltyModuleService extends MedusaService({
  LoyaltyPoint,
}) {
  private options: LoyaltyOptions;

  constructor(_: unknown, options?: LoyaltyOptions) {
    // eslint-disable-next-line prefer-rest-params -- Standard super constructor behavior
    super(...arguments);

    this.options = options || DEFAULT_LOYALTY_OPTIONS;
  }

  async addPoints(customerId: string, points: number): Promise<LoyaltyPoint> {
    const existingPoints = await this.listLoyaltyPoints({
      customer_id: customerId,
    });

    if (existingPoints.length > 0) {
      return await this.updateLoyaltyPoints({
        id: existingPoints[0].id,
        points: existingPoints[0].points + points,
      });
    }

    return await this.createLoyaltyPoints({
      customer_id: customerId,
      points,
    });
  }

  async deductPoints(
    customerId: string,
    points: number
  ): Promise<LoyaltyPoint> {
    const existingPoints = await this.listLoyaltyPoints({
      customer_id: customerId,
    });

    if (existingPoints.length === 0 || existingPoints[0].points < points) {
      throw new MedusaError(
        MedusaError.Types.NOT_ALLOWED,
        'Insufficient loyalty points'
      );
    }

    return await this.updateLoyaltyPoints({
      id: existingPoints[0].id,
      points: existingPoints[0].points - points,
    });
  }

  async getPoints(customerId: string): Promise<number> {
    const points = await this.listLoyaltyPoints({
      customer_id: customerId,
    });

    return points[0]?.points || 0;
  }

  async calculatePointsFromAmount(amount: number): Promise<number> {
    // Convert amount to points using the given conversion rate
    // Round down to nearest whole point
    const points = Math.floor(Math.floor(amount) / this.options.conversionRate);

    if (points < 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Amount cannot be negative'
      );
    }

    return points;
  }
}

export default LoyaltyModuleService;

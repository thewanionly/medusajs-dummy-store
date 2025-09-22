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

  /**
   * Calculates the loyalty points earned from a purchase amount.
   *
   * @param amount - Purchase amount
   * @returns
   */
  async calculatePointsFromAmount(amount: number): Promise<number> {
    if (amount < 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Amount cannot be negative'
      );
    }

    // By default, purchasing 10 units of currency grants 1 point
    const points = Math.floor(amount / this.options.conversionRate);

    return points;
  }

  /**
   * Calculates the amount to be discounted from redeeming loyalty points.
   *
   * @param points - Loyalty points to redeem
   * @returns
   */
  async calculateAmountFromPoints(points: number): Promise<number> {
    if (points < 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Points cannot be negative'
      );
    }

    // By default, redeeming 1 point grants 1 unit of currency
    const amount = points;

    return amount;
  }

  /**
   * Calculates the loyalty points required to redeem a promo discount
   *
   * @param discountAmount - The promo discount value
   */
  async calculatePointsRequired(discountAmount: number): Promise<number> {
    if (discountAmount < 0) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        'Discount cannot be negative'
      );
    }

    // By default, 1 unit of currency requires redeeming 1 point
    const points = discountAmount;

    return points;
  }
}

export default LoyaltyModuleService;

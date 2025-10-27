import type { HttpTypes } from '@medusajs/types';

import { MedusaBaseService } from '.';

export class CartService extends MedusaBaseService {
  async getCart(id: string): Promise<HttpTypes.StoreCart | null> {
    try {
      const response = await this.medusa.store.cart.retrieve(id, {
        fields:
          '+items.*,items.variant.*,items.variant.product.*,shipping_methods.*',
      });
      return response.cart || null;
    } catch (error: unknown) {
      console.error('Error fetching cart:', (error as Error).message);
      return null;
    }
  }

  async createCart(
    data: HttpTypes.StoreCreateCart
  ): Promise<HttpTypes.StoreCart | null> {
    try {
      const response = await this.medusa.store.cart.create(data);
      return response.cart || null;
    } catch (error: unknown) {
      console.error('Error creating cart:', (error as Error).message);
      return null;
    }
  }

  async updateCart(
    id: string,
    data: HttpTypes.StoreUpdateCart
  ): Promise<HttpTypes.StoreCart | null> {
    try {
      const response = await this.medusa.store.cart.update(id, data);
      return response.cart || null;
    } catch (error: unknown) {
      console.error('Error updating cart:', (error as Error).message);
      return null;
    }
  }

  async createLineItem(
    cartId: string,
    data: HttpTypes.StoreAddCartLineItem
  ): Promise<HttpTypes.StoreCart | null> {
    try {
      const response = await this.medusa.store.cart.createLineItem(
        cartId,
        data
      );
      return response.cart || null;
    } catch (error: unknown) {
      console.error('Error adding line item:', (error as Error).message);
      return null;
    }
  }

  async updateLineItem(
    cartId: string,
    lineItemId: string,
    data: HttpTypes.StoreUpdateCartLineItem
  ): Promise<HttpTypes.StoreCart | null> {
    try {
      const response = await this.medusa.store.cart.updateLineItem(
        cartId,
        lineItemId,
        data
      );
      return response.cart || null;
    } catch (error: unknown) {
      console.error('Error updating line item:', (error as Error).message);
      return null;
    }
  }

  async deleteLineItem(
    cartId: string,
    lineItemId: string
  ): Promise<HttpTypes.StoreLineItemDeleteResponse | null> {
    try {
      const response = await this.medusa.store.cart.deleteLineItem(
        cartId,
        lineItemId
      );
      return response;
    } catch (error: unknown) {
      console.error('Error deleting line item:', (error as Error).message);
      return null;
    }
  }

  async addShippingMethod(
    cartId: string,
    optionId: string
  ): Promise<HttpTypes.StoreCart | null> {
    try {
      const response = await this.medusa.store.cart.addShippingMethod(cartId, {
        option_id: optionId,
      });
      return response.cart || null;
    } catch (error: unknown) {
      console.error('Error adding shipping method:', (error as Error).message);
      return null;
    }
  }

  async completeCart(
    cartId: string
  ): Promise<HttpTypes.StoreCompleteCartResponse | null> {
    try {
      const response = await this.medusa.store.cart.complete(cartId);
      return response;
    } catch (error: unknown) {
      console.error('Error completing cart:', (error as Error).message);
      return null;
    }
  }
}

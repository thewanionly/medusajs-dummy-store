import axios from 'axios';

import { Product } from '@/types/products';

export class ProductService {
  private baseURL: string;
  private publishableKey?: string;

  constructor(baseURL: string, publishableKey?: string) {
    this.baseURL = baseURL;
    this.publishableKey = publishableKey;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.publishableKey) {
      headers['x-publishable-api-key'] = this.publishableKey;
    }

    return headers;
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await axios.get(`${this.baseURL}/store/products`, {
        headers: this.getHeaders(),
      });
      return response.data.products || [];
    } catch (error) {
      return [];
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      const response = await axios.get(`${this.baseURL}/store/products/${id}`, {
        headers: this.getHeaders(),
      });
      return response.data.product || null;
    } catch (error) {
      return null;
    }
  }
}

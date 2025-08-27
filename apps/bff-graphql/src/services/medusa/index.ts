import { ProductService } from './product';

export class MedusaAPI {
  private baseURL: string;
  private publishableKey?: string;

  public products: ProductService;

  constructor() {
    this.baseURL = process.env.MEDUSA_API_URL || 'http://localhost:9000';
    this.publishableKey = process.env.MEDUSA_PUBLISHABLE_KEY;

    this.products = new ProductService(this.baseURL, this.publishableKey);
  }

  async getProducts() {
    return this.products.getProducts();
  }

  async getProduct(id: string) {
    return this.products.getProduct(id);
  }
}

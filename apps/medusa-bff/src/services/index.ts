import { ProductService } from './medusa/product';

export const createServices = () => {
  const baseUrl = process.env.MEDUSA_API_URL || 'http://localhost:9000';
  const publishableKey = process.env.MEDUSA_PUBLISHABLE_KEY;

  return {
    productService: new ProductService(baseUrl, publishableKey),
  };
};

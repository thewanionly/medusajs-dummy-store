import { AlgoliaSearchService } from './algolia/search';
import { CategoryService } from './medusa/category';
import { CollectionService } from './medusa/collection';
import { ProductService } from './medusa/product';

export const createServices = () => {
  const baseUrl = process.env.MEDUSA_API_URL || 'http://localhost:9000';
  const publishableKey = process.env.MEDUSA_PUBLISHABLE_KEY;

  return {
    productService: new ProductService(baseUrl, publishableKey),
    categoryService: new CategoryService(baseUrl, publishableKey),
    collectionService: new CollectionService(baseUrl, publishableKey),
    algoliaSearchService: new AlgoliaSearchService(),
  };
};

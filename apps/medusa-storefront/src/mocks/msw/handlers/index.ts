import { handlers as collectionsHandlers } from './collections';
import { handlers as productCategoriesHandlers } from './product-categories';
import { handlers as productsHandlers } from './products';
import { handlers as searchHandlers } from './search';

export const handlers = [
  ...collectionsHandlers,
  ...productCategoriesHandlers,
  ...productsHandlers,
  ...searchHandlers,
];

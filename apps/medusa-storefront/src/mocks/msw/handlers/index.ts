import { handlers as cartHandlers } from './carts';
import { handlers as collectionsHandlers } from './collections';
import { handlers as customerHandlers } from './customer';
import { handlers as productCategoriesHandlers } from './product-categories';
import { handlers as productsHandlers } from './products';
import { handlers as regionHandlers } from './regions';
import { handlers as searchHandlers } from './search';

export const handlers = [
  ...cartHandlers,
  ...collectionsHandlers,
  ...customerHandlers,
  ...productCategoriesHandlers,
  ...productsHandlers,
  ...regionHandlers,
  ...searchHandlers,
];

import { GraphQLHandler, HttpHandler } from 'msw';

import { handlers as cartHandlers } from './carts';
import { handlers as collectionsHandlers } from './collections';
import { handlers as customerHandlers } from './customer';
import { handlers as productCategoriesHandlers } from './product-categories';
import { handlers as productsHandlers } from './products';
import { handlers as regionHandlers } from './regions';
import { handlers as searchHandlers } from './search';
import { handlers as wishlistHandlers } from './wishlist';

const allHandlers = [
  ...cartHandlers,
  ...collectionsHandlers,
  ...customerHandlers,
  ...productCategoriesHandlers,
  ...productsHandlers,
  ...regionHandlers,
  ...searchHandlers,
  ...wishlistHandlers,
];

const isRequestHandler = (
  handler: GraphQLHandler | HttpHandler | undefined
): handler is GraphQLHandler | HttpHandler => Boolean(handler);

export const handlers = allHandlers.filter(isRequestHandler);

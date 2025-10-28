import { handlers as cartsHandlers } from './carts';
import { handlers as productsHandlers } from './products';
import { handlers as regionsHandlers } from './regions';
import { handlers as searchHandlers } from './search';

export const handlers = [
  ...cartsHandlers,
  ...productsHandlers,
  ...regionsHandlers,
  ...searchHandlers,
];

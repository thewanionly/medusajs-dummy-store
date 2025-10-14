import { handlers as cartsHandlers } from './carts';
import { handlers as productsHandlers } from './products';
import { handlers as regionsHandlers } from './regions';

export const handlers = [
  ...cartsHandlers,
  ...productsHandlers,
  ...regionsHandlers,
];

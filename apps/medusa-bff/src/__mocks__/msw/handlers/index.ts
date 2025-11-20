import { handlers as customerHandlers } from './customer';
import { handlers as productHandlers } from './product';
import { handlers as sanityHandlers } from './sanity';
import { handlers as searchHandlers } from './search';
import { handlers as wishlistHandlers } from './wishlist';

export const handlers = [
  ...productHandlers,
  ...sanityHandlers,
  ...customerHandlers,
  ...searchHandlers,
  ...wishlistHandlers,
];

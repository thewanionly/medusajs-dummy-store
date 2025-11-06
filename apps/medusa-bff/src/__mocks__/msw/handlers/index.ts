import { handlers as customerHandlers } from './customer';
import { handlers as productHandlers } from './product';
import { handlers as sanityHandlers } from './sanity';

export const handlers = [
  ...productHandlers,
  ...sanityHandlers,
  ...customerHandlers,
];

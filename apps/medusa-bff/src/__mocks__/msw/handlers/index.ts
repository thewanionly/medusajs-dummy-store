import { handlers as cartHandlers } from './cart';
import { handlers as customerHandlers } from './customer';
import { handlers as productHandlers } from './product';

export const handlers = [
  ...productHandlers,
  ...customerHandlers,
  ...cartHandlers,
];

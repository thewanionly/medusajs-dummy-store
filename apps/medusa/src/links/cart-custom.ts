import { defineLink } from '@medusajs/framework/utils';
import CartModule from '@medusajs/medusa/cart';

import HelloModule from '../modules/hello';

export default defineLink(
  CartModule.linkable.cart,
  HelloModule.linkable.custom
);

import { defineLink } from '@medusajs/framework/utils';
import ProductModule from '@medusajs/medusa/product';

import ProductExtendedModule from '../modules/productExtended';

export default defineLink(
  ProductModule.linkable.product,
  ProductExtendedModule.linkable.productExtended
);

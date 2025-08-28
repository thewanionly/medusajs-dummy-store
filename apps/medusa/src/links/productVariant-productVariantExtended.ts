import { defineLink } from '@medusajs/framework/utils';
import ProductModule from '@medusajs/medusa/product';

import ProductVariantExtendedModule from '../modules/productVariantExtended';

export default defineLink(
  ProductModule.linkable.productVariant,
  ProductVariantExtendedModule.linkable.productVariantExtended
);

import { Module } from '@medusajs/framework/utils';

import ProductVariantExtendedService from './service';

export const PRODUCT_VARIANT_EXTENDED_MODULE = 'productVariantExtended';

export default Module(PRODUCT_VARIANT_EXTENDED_MODULE, {
  service: ProductVariantExtendedService,
});

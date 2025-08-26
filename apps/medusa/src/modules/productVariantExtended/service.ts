import { MedusaService } from '@medusajs/framework/utils';

import ProductVariantExtended from './models/productVariantExtended';

class ProductVariantExtendedService extends MedusaService({
  ProductVariantExtended,
}) {}

export default ProductVariantExtendedService;

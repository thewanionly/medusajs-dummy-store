import { MedusaService } from '@medusajs/framework/utils';

import ProductExtended from './models/productExtended';

class ProductExtendedService extends MedusaService({
  ProductExtended,
}) {}

export default ProductExtendedService;

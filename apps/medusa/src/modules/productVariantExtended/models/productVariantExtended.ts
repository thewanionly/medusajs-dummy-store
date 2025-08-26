import { model } from '@medusajs/framework/utils';

const ProductVariantExtended = model.define('productVariantExtended', {
  id: model.id().primaryKey(),
  requires_shipping: model.boolean(),
});

export default ProductVariantExtended;

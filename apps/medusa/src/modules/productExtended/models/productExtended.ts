import { model } from '@medusajs/framework/utils';

const ProductExtended = model.define('productExtended', {
  id: model.id().primaryKey(),
  vendor: model.text(),
});

export default ProductExtended;

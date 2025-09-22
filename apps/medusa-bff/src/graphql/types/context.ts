import { CollectionService } from '@services/medusa/collection';
import { ProductService } from '@services/medusa/product';

export interface GraphQLContext {
  productService: ProductService;
  collectionService: CollectionService;
}

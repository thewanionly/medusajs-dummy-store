import { CartService } from '@services/medusa/cart';
import { CategoryService } from '@services/medusa/category';
import { CollectionService } from '@services/medusa/collection';
import { ProductService } from '@services/medusa/product';

export interface GraphQLContext {
  productService: ProductService;
  collectionService: CollectionService;
  categoryService: CategoryService;
  cartService: CartService;
}

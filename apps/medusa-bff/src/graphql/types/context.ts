import { ProductService } from '../../services/medusa/product';

export interface GraphQLContext {
  productService: ProductService;
}

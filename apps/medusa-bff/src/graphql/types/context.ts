import type express from 'express';
import { Session, SessionData } from 'express-session';

import Medusa from '@medusajs/js-sdk';
import { CartService } from '@services/medusa/cart';
import { CategoryService } from '@services/medusa/category';
import { CollectionService } from '@services/medusa/collection';
import { ProductService } from '@services/medusa/product';

export type GraphQLContext = {
  req: express.Request;
  res: express.Response;
  session: Session & Partial<SessionData>;
  medusa: Medusa;
  productService: ProductService;
  categoryService: CategoryService;
  collectionService: CollectionService;
  cartService: CartService;
};

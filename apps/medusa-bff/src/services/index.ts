import type express from 'express';
import { Session, SessionData } from 'express-session';

import Medusa from '@medusajs/js-sdk';

import { CategoryService } from './medusa/category';
import { CollectionService } from './medusa/collection';
import { ProductService } from './medusa/product';

export function createContext({ req }: { req: express.Request }) {
  let _productService: ProductService | null = null;
  let _categoryService: CategoryService | null = null;
  let _collectionService: CollectionService | null = null;

  const createMedusa = (session: Session & Partial<SessionData>) => {
    const medusaToken = session.medusaToken;

    const medusa = new Medusa({
      baseUrl: process.env.MEDUSA_API_URL || 'http://localhost:9000',
      auth: {
        type: 'session',
      },
      globalHeaders: {
        'X-Publishable-API-Key':
          process.env.MEDUSA_PUBLISHABLE_KEY || 'pk_test',
        ...(medusaToken
          ? { Authorization: `Bearer ${medusaToken}` }
          : undefined),
      },
    });

    if (medusaToken) medusa.client.setToken(medusaToken);

    return medusa;
  };

  const session = req.session;
  const medusa = createMedusa(session);

  return {
    session,
    medusa,
    get productService() {
      if (!_productService) _productService = new ProductService(medusa);
      return _productService;
    },
    get categoryService() {
      if (!_categoryService) _categoryService = new CategoryService(medusa);
      return _categoryService;
    },
    get collectionService() {
      if (!_collectionService)
        _collectionService = new CollectionService(medusa);
      return _collectionService;
    },
  };
}

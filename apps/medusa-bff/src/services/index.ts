import type express from 'express';
import { Session, SessionData } from 'express-session';

import { GraphQLContext } from '@graphql/types/context';
import Medusa from '@medusajs/js-sdk';
import { createClient } from '@sanity/client';

import { CategoryService } from './medusa/category';
import { CollectionService } from './medusa/collection';
import { ProductService } from './medusa/product';

export function createContext({
  req,
  res,
}: {
  req: express.Request;
  res: express.Response;
}): GraphQLContext {
  let _productService: ProductService | null = null;
  let _categoryService: CategoryService | null = null;
  let _collectionService: CollectionService | null = null;

  const createMedusa = (session: Session & Partial<SessionData>) => {
    const medusaToken = session.medusaToken;

    const medusa = new Medusa({
      baseUrl: process.env.MEDUSA_API_URL || 'http://localhost:9000',
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

  const sanityClient = createClient({
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || 'production',
    apiVersion: process.env.SANITY_API_VERSION || '2023-05-03',
    useCdn: process.env.NODE_ENV === 'production',
    token: process.env.SANITY_API_TOKEN,
  });

  const session = req.session;
  const medusa = createMedusa(session);

  return {
    req,
    res,
    session,
    medusa,
    sanityClient,
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

import { IncomingMessage } from 'http';

import Medusa from '@medusajs/js-sdk';

import { CategoryService } from './medusa/category';
import { CollectionService } from './medusa/collection';
import { ProductService } from './medusa/product';

export function createContext({ req }: { req: IncomingMessage }) {
  let _medusa: Medusa | null = null;
  let _productService: ProductService | null = null;
  let _categoryService: CategoryService | null = null;
  let _collectionService: CollectionService | null = null;

  const createMedusa = () => {
    const authHeader = (req.headers && (req.headers as any).authorization) as
      | string
      | undefined;

    if (!_medusa) {
      _medusa = new Medusa({
        baseUrl: process.env.MEDUSA_API_URL || 'http://localhost:9000',
        auth: {
          type: 'jwt',
        },
        globalHeaders: {
          'X-Publishable-API-Key':
            process.env.MEDUSA_PUBLISHABLE_KEY || 'pk_test',
          ...(authHeader ? { Authorization: authHeader } : undefined),
        },
      });
    }

    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      if (token) _medusa.client.setToken(token);
    }

    return _medusa;
  };

  return {
    get medusa() {
      return createMedusa();
    },
    get productService() {
      if (!_productService)
        _productService = new ProductService(createMedusa());
      return _productService;
    },
    get categoryService() {
      if (!_categoryService)
        _categoryService = new CategoryService(createMedusa());
      return _categoryService;
    },
    get collectionService() {
      if (!_collectionService)
        _collectionService = new CollectionService(createMedusa());
      return _collectionService;
    },
  };
}

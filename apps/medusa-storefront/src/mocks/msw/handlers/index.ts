import { handlers as collectionsHandlers } from './collections';
import { handlers as productsHandlers } from './products';

export const handlers = [...collectionsHandlers, ...productsHandlers];

import { handlers as productsHandlers } from './products';
import { handlers as regionsHandlers } from './regions';

export const handlers = [...regionsHandlers, ...productsHandlers];

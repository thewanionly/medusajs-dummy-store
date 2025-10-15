import { HttpResponse, delay } from 'msw';

import { searchResults } from '../../data/search';
import { medusaBff } from '../apis';

export const handlers = [
  medusaBff.query('SearchProducts', async () => {
    await delay(1000);

    return HttpResponse.json({
      data: {
        search: searchResults,
      },
    });
  }),
];

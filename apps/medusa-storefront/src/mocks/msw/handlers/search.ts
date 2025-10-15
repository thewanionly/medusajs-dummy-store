import { HttpResponse, delay, http } from 'msw';

import { searchResults } from '../../data/search';

export const handlers = [
  http.post('http://localhost:9000/store/products/search', async () => {
    await delay(1000);

    return HttpResponse.json({
      results: searchResults,
    });
  }),
];

import { HttpResponse, delay } from 'msw';

import { mockedSearchSuggestions } from '../../../data/search';
import { medusaBff } from '../../apis';

export const handlers = [
  medusaBff.query('SearchSuggestions', async ({ variables }) => {
    const { query } = variables as { query: string };

    await delay(500);

    const searchTerm = query.toLowerCase();
    const filteredItems = mockedSearchSuggestions.filter((item) =>
      item.title.toLowerCase().includes(searchTerm)
    );

    return HttpResponse.json({
      data: {
        searchProducts: {
          items: filteredItems,
        },
      },
    });
  }),
];

export const serverError = medusaBff.query('SearchSuggestions', async () => {
  await delay(1000);

  return HttpResponse.json({
    errors: [
      {
        message: 'Something went wrong. Please try again.',
      },
    ],
  });
});

import { HttpResponse, passthrough } from 'msw';

import { mockedSearchSuggestions } from '../../data/search';
import { activeGqlMocks } from '../activeMocks';
import { medusaBff } from '../apis';

export const handlers = [
  medusaBff.query('SearchSuggestions', async ({ variables }) => {
    if (!activeGqlMocks.SearchSuggestions) {
      return passthrough();
    }

    const { query } = variables as { query: string };

    await new Promise((resolve) => setTimeout(resolve, 500));

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

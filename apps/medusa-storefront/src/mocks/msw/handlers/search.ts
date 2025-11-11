import { HttpResponse, delay } from 'msw';

import { mockedSearchSuggestions } from '../../data/search';
import { storefrontMedusaBffWrapper } from '../utils/apis';
import { withActiveMockGate } from '../utils/withActiveMockGate';

// Happy paths
export const searchSuggestionsSuccess = storefrontMedusaBffWrapper.query(
  'SearchSuggestions',
  async ({ variables }) => {
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
  }
);

// Handlers used in the application.
// Use `withActiveMockGate` to enable/disable the handler based on activeMock config
export const handlers = [
  withActiveMockGate('SearchSuggestions', searchSuggestionsSuccess),
];

// Other paths
export const serverError = storefrontMedusaBffWrapper.query(
  'SearchSuggestions',
  async () => {
    await delay(1000);

    return HttpResponse.json({
      errors: [
        {
          message: 'Something went wrong. Please try again.',
        },
      ],
    });
  }
);

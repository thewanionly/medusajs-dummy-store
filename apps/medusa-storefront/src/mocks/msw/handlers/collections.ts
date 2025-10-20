import { HttpResponse, passthrough } from 'msw';

import {
  mockedCollectionSummary,
  mockedCollections,
} from '../../data/collections';
import { activeGqlMocks } from '../activeMocks';
import { medusaBff } from '../apis';

export const handlers = [
  medusaBff.query('GetCollections', () => {
    if (!activeGqlMocks.GetCollections) {
      return passthrough();
    }

    return HttpResponse.json({
      data: {
        collections: mockedCollections,
      },
    });
  }),
  medusaBff.query('GetCollectionsSummary', () => {
    if (!activeGqlMocks.GetCollectionsSummary) {
      return passthrough();
    }

    return HttpResponse.json({
      data: {
        collections: [mockedCollectionSummary],
      },
    });
  }),
];

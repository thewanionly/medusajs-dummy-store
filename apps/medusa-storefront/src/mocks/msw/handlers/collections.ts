import { HttpResponse } from 'msw';

import {
  mockedCollectionSummary,
  mockedCollections,
} from '../../data/collections';
import { storefrontMedusaBffWrapper } from '../utils/apis';
import { withActiveMockGate } from '../utils/withActiveMockGate';

// Happy paths
export const getCollectionsSuccess = storefrontMedusaBffWrapper.query(
  'GetCollections',
  () => {
    return HttpResponse.json({
      data: {
        collections: mockedCollections,
      },
    });
  }
);

export const getCollectionsSummarySuccess = storefrontMedusaBffWrapper.query(
  'GetCollectionsSummary',
  () => {
    return HttpResponse.json({
      data: {
        collections: [mockedCollectionSummary],
      },
    });
  }
);

// Handlers used in the application.
// Use `withActiveMockGate` to enable/disable the handler based on activeMock config
export const handlers = [
  withActiveMockGate('GetCollections', getCollectionsSuccess),
  withActiveMockGate('GetCollectionsSummary', getCollectionsSummarySuccess),
];

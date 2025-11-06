import { HttpResponse, passthrough } from 'msw';

import {
  mockedCollectionSummary,
  mockedCollections,
} from '../../data/collections';
import { medusaBff } from '../utils/apis';
import { withActiveMockGate } from '../utils/withActiveMockGate';

// Happy paths
export const getCollectionsSuccess = medusaBff.query('GetCollections', () => {
  return HttpResponse.json({
    data: {
      collections: mockedCollections,
    },
  });
});

export const getCollectionsSummarySuccess = medusaBff.query(
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

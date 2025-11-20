import { HttpResponse, http } from 'msw';

import { mockedRegions } from '../../data/regions';
import { medusaBackend } from '../utils/apis';
import { withActiveMockGate } from '../utils/withActiveMockGate';

// Happy paths
export const getRegionSuccess = http.get(
  `${medusaBackend}/store/regions`,
  () => {
    return HttpResponse.json({
      regions: mockedRegions,
      count: 1,
      limit: 50,
      offset: 0,
    });
  }
);

// Handlers used in the application.
// Use `withActiveMockGate` to enable/disable the handler based on activeMock config
export const handlers = [withActiveMockGate('GetRegions', getRegionSuccess)];

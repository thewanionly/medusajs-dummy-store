import { HttpResponse, http } from 'msw';

import { mockedRegions } from '../../../data/storybook/regions';

export const handlers = [
  http.get('http://localhost:9000/store/regions', () => {
    return HttpResponse.json({
      regions: mockedRegions,
      count: 1,
      limit: 50,
      offset: 0,
    });
  }),
];

import { HttpResponse, http } from 'msw';

import { mockFooterData } from '@mocks/data/footer';

const projectId = process.env.SANITY_PROJECT_ID;
const dataset = process.env.SANITY_DATASET;
const apiVersion = process.env.SANITY_API_VERSION;

/* Success (i.e. happy path) handlers */
export const handlers = [
  http.get(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
    ({ request }) => {
      const url = new URL(request.url);
      const query = url.searchParams.get('query');

      if (query && query.includes('footer')) {
        return HttpResponse.json({
          result: mockFooterData,
        });
      }

      return HttpResponse.json({
        result: [],
      });
    }
  ),
];

/* Other handlers */
export const emptyFooterHandler = http.get(
  `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');

    if (query && query.includes('footer')) {
      return HttpResponse.json({
        result: [],
      });
    }

    return HttpResponse.json({
      result: [],
    });
  }
);

export const nullFooterHandler = http.get(
  `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');

    if (query && query.includes('footer')) {
      return HttpResponse.json({
        result: null,
      });
    }

    return HttpResponse.json({
      result: [],
    });
  }
);

export const undefinedFooterHandler = http.get(
  `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get('query');

    if (query && query.includes('footer')) {
      return HttpResponse.json({
        result: undefined,
      });
    }

    return HttpResponse.json({
      result: [],
    });
  }
);

export const generalErrorHandler = http.get(
  `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  () => {
    return HttpResponse.json({ error: 'Sanity API error' }, { status: 500 });
  }
);

export const authErrorHandler = http.get(
  `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  () => {
    return HttpResponse.json(
      { error: 'Unauthorized - Invalid API token' },
      { status: 401 }
    );
  }
);

export const queryErrorHandler = http.get(
  `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`,
  () => {
    return HttpResponse.json(
      { error: 'Invalid GROQ query syntax' },
      { status: 400 }
    );
  }
);

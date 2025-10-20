import { SanityClient, createClient } from '@sanity/client';

export class SanityBaseService {
  protected sanity: SanityClient;

  constructor() {
    this.sanity = createClient({
      projectId: process.env.SANITY_PROJECT_ID,
      dataset: process.env.SANITY_DATASET || 'production',
      apiVersion: process.env.SANITY_API_VERSION || '2023-05-03',
      useCdn: process.env.NODE_ENV === 'production',
      token: process.env.SANITY_API_TOKEN,
    });
  }
}

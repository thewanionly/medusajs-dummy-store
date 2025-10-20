import { Footer } from '@graphql/generated/graphql';

import { SanityBaseService } from './';

export class SanityFooterService extends SanityBaseService {
  async getFooterContent(query: string): Promise<Footer[] | null> {
    try {
      const result = await this.sanity.fetch(query);

      return result;
    } catch (error) {
      console.error('Error fetching footer content from Sanity:', error);

      return [];
    }
  }
}

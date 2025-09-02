import Medusa from '@medusajs/js-sdk';

export class MedusaBaseService {
  protected medusa: Medusa;
  protected baseURL: string;
  protected publishableKey?: string;

  constructor(baseURL?: string, publishableKey?: string) {
    this.baseURL =
      baseURL || process.env.MEDUSA_API_URL || 'http://localhost:9000';
    this.publishableKey = publishableKey || process.env.MEDUSA_PUBLISHABLE_KEY;

    this.medusa = new Medusa({
      baseUrl: this.baseURL,
      publishableKey: this.publishableKey,
    });
  }
}

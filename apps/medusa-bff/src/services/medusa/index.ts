import Medusa from '@medusajs/js-sdk';

export class MedusaBaseService {
  private medusa: Medusa;
  private baseURL: string;
  private publishableKey?: string;

  constructor(medusaClient: Medusa) {
    this.medusa = medusaClient;
    this.baseURL = process.env.MEDUSA_API_URL || 'http://localhost:9000';
    this.publishableKey = process.env.MEDUSA_PUBLISHABLE_KEY;
  }
}

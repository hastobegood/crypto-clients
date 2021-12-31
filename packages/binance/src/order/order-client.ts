import { Client } from '../common/client.js';
import { SecuredApiInfoProvider } from '../api/api-info-provider.js';

export class OrderClient extends Client {
  constructor(protected readonly apiInfoProvider: SecuredApiInfoProvider) {
    super();
  }
}

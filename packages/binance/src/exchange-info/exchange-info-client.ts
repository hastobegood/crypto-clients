import { Client } from '../common/client.js';
import { ApiInfoProvider } from '../api/api-info-provider.js';

export class ExchangeInfoClient extends Client {
  constructor(protected readonly apiInfoProvider: ApiInfoProvider) {
    super();
  }
}

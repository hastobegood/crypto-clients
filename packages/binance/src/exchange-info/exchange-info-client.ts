import { Client } from '../common/client.js';
import { Command } from '../common/command.js';
import { ApiInfoProvider } from '../api/api-info-provider.js';

export class ExchangeInfoClient extends Client {
  constructor(protected readonly apiInfoProvider: ApiInfoProvider) {
    super();
  }

  async send<I, O>(command: Command<I, O>): Promise<O> {
    return command.execute(this.apiInfoProvider);
  }
}

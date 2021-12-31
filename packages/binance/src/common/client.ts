import { Command } from './command.js';
import { ApiInfoProvider } from '../api/api-info-provider.js';

export abstract class Client {
  protected abstract readonly apiInfoProvider: ApiInfoProvider;

  async send<I, O>(command: Command<I, O>): Promise<O> {
    return command.execute(this.apiInfoProvider);
  }
}

import { Command } from './command.js';

export interface ApiInfoProvider {
  getApiUrl(): Promise<string>;
}

export interface SecuredApiInfoProvider extends ApiInfoProvider {
  getApiKey(): Promise<string>;

  getSecretKey(): Promise<string>;
}

export class Client {
  constructor(private readonly apiInfoProvider: ApiInfoProvider) {}

  async send<O>(command: Command<O>): Promise<O> {
    return command.execute(this.apiInfoProvider);
  }
}

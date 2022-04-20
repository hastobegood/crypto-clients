import { EventEmitter } from 'events';

import { AxiosInstance } from 'axios';

import { Command } from './command.js';
import { axiosInstance, HttpRequest, HttpResponse } from './common/http.js';

export interface ApiInfoProvider {
  getApiUrl(): Promise<string>;

  getApiKey(): Promise<string>;

  getSecretKey(): Promise<string>;
}

export interface ClientOptions {
  apiInfoProvider: ApiInfoProvider;
  httpOptions?: {
    timeout?: number;
  };
}

export class Client {
  readonly #emitter: EventEmitter;
  readonly #axiosInstance: AxiosInstance;
  readonly #apiInfoProvider: ApiInfoProvider;

  constructor(options: ClientOptions) {
    this.#emitter = new EventEmitter();
    this.#axiosInstance = axiosInstance({ emitter: this.#emitter, timeout: options.httpOptions?.timeout });
    this.#apiInfoProvider = options.apiInfoProvider;
  }

  onHttpRequest(listener: (httpRequest: HttpRequest) => void): void {
    this.#emitter.on('HttpRequest', listener);
  }

  onHttpResponse(listener: (httpRequest: HttpRequest, httpResponse?: HttpResponse) => void): void {
    this.#emitter.on('HttpResponse', listener);
  }

  async send<O>(command: Command<O>): Promise<O> {
    return command.execute(this.#axiosInstance, this.#apiInfoProvider);
  }
}

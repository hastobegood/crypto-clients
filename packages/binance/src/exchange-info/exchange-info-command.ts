import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from '../common/axios-instance.js';
import { Command, CommandInput, CommandOutput } from '../common/command.js';
import { ApiInfoProvider } from '../api/api-info-provider.js';
import { GetExchangeInfoInput, GetExchangeInfoOutput } from './exchange-info.js';

export type GetExchangeInfoCommandInput = CommandInput<GetExchangeInfoInput>;
export type GetExchangeInfoCommandOutput = CommandOutput<GetExchangeInfoOutput>;

export class GetExchangeInfoCommand extends Command<GetExchangeInfoCommandInput, GetExchangeInfoCommandOutput> {
  constructor(readonly input: GetExchangeInfoCommandInput) {
    super();
  }

  async execute(apiInfoProvider: ApiInfoProvider): Promise<GetExchangeInfoCommandOutput> {
    const queryParameters = `symbol=${this.input.data.symbol}`;
    const queryUrl = `/v3/exchangeInfo?${queryParameters}`;
    const queryConfig = this.#getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<GetExchangeInfoOutput>(queryUrl, queryConfig));
  }

  #getQueryConfig(apiUrl: string): AxiosRequestConfig {
    return {
      baseURL: apiUrl,
    };
  }
}

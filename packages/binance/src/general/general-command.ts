import { AxiosInstance } from 'axios';

import { ApiInfoProvider } from '../client.js';
import { Command, CommandOutput, EmptyCommandOutput } from '../command.js';
import { getQueryConfig, getQueryParameters } from '../common/http.js';

import { GetExchangeInfoInput, GetExchangeInfoOutput, GetServerTimeOutput } from './general.js';

export class TestConnectivityCommand extends Command<EmptyCommandOutput> {
  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<EmptyCommandOutput> {
    const queryUrl = '/v3/ping';
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<never>(queryUrl, queryConfig));
  }
}

export type GetServerTimeCommandOutput = CommandOutput<GetServerTimeOutput>;

export class GetServerTimeCommand extends Command<GetServerTimeCommandOutput> {
  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<GetServerTimeCommandOutput> {
    const queryUrl = '/v3/time';
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<GetServerTimeOutput>(queryUrl, queryConfig));
  }
}

export type GetExchangeInfoCommandOutput = CommandOutput<GetExchangeInfoOutput>;

export class GetExchangeInfoCommand extends Command<GetExchangeInfoCommandOutput> {
  constructor(private readonly input?: GetExchangeInfoInput) {
    super();
  }

  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<GetExchangeInfoCommandOutput> {
    const queryParameters = getQueryParameters(this.input, false);
    const queryUrl = `/v3/exchangeInfo?${queryParameters}`;
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<GetExchangeInfoOutput>(queryUrl, queryConfig));
  }
}

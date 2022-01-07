import { axiosInstance, getQueryConfig, getQueryParameters } from '../common/axios-instance.js';
import { ApiInfoProvider } from '../client.js';
import { Command, CommandOutput, EmptyCommandOutput } from '../command.js';
import { GetExchangeInfoInput, GetExchangeInfoOutput, GetServerTimeOutput } from './general.js';

export class TestConnectivityCommand extends Command<EmptyCommandOutput> {
  async execute(apiInfoProvider: ApiInfoProvider): Promise<EmptyCommandOutput> {
    const queryUrl = '/v3/ping';
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<never>(queryUrl, queryConfig));
  }
}

export type GetServerTimeCommandOutput = CommandOutput<GetServerTimeOutput>;

export class GetServerTimeCommand extends Command<GetServerTimeCommandOutput> {
  async execute(apiInfoProvider: ApiInfoProvider): Promise<GetServerTimeCommandOutput> {
    const queryUrl = '/v3/time';
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<GetServerTimeOutput>(queryUrl, queryConfig));
  }
}

export type GetExchangeInfoCommandOutput = CommandOutput<GetExchangeInfoOutput>;

export class GetExchangeInfoCommand extends Command<GetExchangeInfoCommandOutput> {
  constructor(readonly input?: GetExchangeInfoInput) {
    super();
  }

  async execute(apiInfoProvider: ApiInfoProvider): Promise<GetExchangeInfoCommandOutput> {
    const queryParameters = getQueryParameters(this.input, false);
    const queryUrl = `/v3/exchangeInfo?${queryParameters}`;
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<GetExchangeInfoOutput>(queryUrl, queryConfig));
  }
}

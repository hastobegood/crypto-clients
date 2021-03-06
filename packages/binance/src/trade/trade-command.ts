import { AxiosInstance } from 'axios';

import { ApiInfoProvider } from '../client.js';
import { Command, CommandOutput } from '../command.js';
import { getQueryConfig, getQueryParameters } from '../common/http.js';
import { sign } from '../common/signature.js';

import { GetAccountTradesListInput, GetAccountTradesListOutput, GetAggregateTradesListInput, GetAggregateTradesListOutput, GetOldTradesListInput, GetOldTradesListOutput, GetRecentTradesListInput, GetRecentTradesListOutput } from './trade.js';

export type GetAccountTradesListCommandOutput = CommandOutput<GetAccountTradesListOutput>;

export class GetAccountTradesListCommand extends Command<GetAccountTradesListCommandOutput> {
  constructor(private readonly input: GetAccountTradesListInput) {
    super();
  }

  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<GetAccountTradesListCommandOutput> {
    const [apiUrl, apiKey, secretKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey(), apiInfoProvider.getSecretKey()]);

    const queryParameters = getQueryParameters(this.input, true);
    const querySignature = sign(queryParameters, secretKey);
    const queryUrl = `/v3/myTrades?${queryParameters}&${querySignature}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.get<GetAccountTradesListOutput>(queryUrl, queryConfig));
  }
}

export type GetRecentTradesListCommandOutput = CommandOutput<GetRecentTradesListOutput>;

export class GetRecentTradesListCommand extends Command<GetRecentTradesListCommandOutput> {
  constructor(private readonly input: GetRecentTradesListInput) {
    super();
  }

  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<GetRecentTradesListCommandOutput> {
    const queryParameters = getQueryParameters(this.input, false);
    const queryUrl = `/v3/trades?${queryParameters}`;
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<GetRecentTradesListOutput>(queryUrl, queryConfig));
  }
}

export type GetOldTradesListCommandOutput = CommandOutput<GetOldTradesListOutput>;

export class GetOldTradesListCommand extends Command<GetOldTradesListCommandOutput> {
  constructor(private readonly input: GetOldTradesListInput) {
    super();
  }

  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<GetOldTradesListCommandOutput> {
    const [apiUrl, apiKey] = await Promise.all([apiInfoProvider.getApiUrl(), apiInfoProvider.getApiKey()]);

    const queryParameters = getQueryParameters(this.input, false);
    const queryUrl = `/v3/historicalTrades?${queryParameters}`;
    const queryConfig = getQueryConfig(apiUrl, apiKey);

    return this.handle(() => axiosInstance.get<GetOldTradesListOutput>(queryUrl, queryConfig));
  }
}

export type GetAggregateTradesListCommandOutput = CommandOutput<GetAggregateTradesListOutput>;

export class GetAggregateTradesListCommand extends Command<GetAggregateTradesListCommandOutput> {
  constructor(private readonly input: GetAggregateTradesListInput) {
    super();
  }

  async execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<GetAggregateTradesListCommandOutput> {
    const queryParameters = getQueryParameters(this.input, false);
    const queryUrl = `/v3/aggTrades?${queryParameters}`;
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<GetAggregateTradesListOutput>(queryUrl, queryConfig));
  }
}

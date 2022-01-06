import { axiosInstance, getQueryConfig, getQueryParameters } from '../common/axios-instance.js';
import { ApiInfoProvider } from '../client.js';
import { Command, CommandInput, CommandOutput } from '../command.js';
import { GetExchangeInfoInput, GetExchangeInfoOutput } from './exchange.js';

export type GetExchangeInfoCommandInput = CommandInput<GetExchangeInfoInput>;
export type GetExchangeInfoCommandOutput = CommandOutput<GetExchangeInfoOutput>;

export class GetExchangeInfoCommand extends Command<GetExchangeInfoCommandInput, GetExchangeInfoCommandOutput> {
  constructor(readonly input: GetExchangeInfoCommandInput) {
    super();
  }

  async execute(apiInfoProvider: ApiInfoProvider): Promise<GetExchangeInfoCommandOutput> {
    const queryParameters = getQueryParameters(this.input.data, false);
    const queryUrl = `/v3/exchangeInfo?${queryParameters}`;
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<GetExchangeInfoOutput>(queryUrl, queryConfig));
  }
}

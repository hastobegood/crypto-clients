import { axiosInstance, getQueryConfig, getQueryParameters } from '../common/axios-instance.js';
import { ApiInfoProvider } from '../client.js';
import { Command, CommandOutput } from '../command.js';
import { GetCandlestickListInput, GetCandlestickListOutput } from './candlestick.js';

export type GetCandlestickListCommandOutput = CommandOutput<GetCandlestickListOutput>;

export class GetCandlestickListCommand extends Command<GetCandlestickListCommandOutput> {
  constructor(readonly input: GetCandlestickListInput) {
    super();
  }

  async execute(apiInfoProvider: ApiInfoProvider): Promise<GetCandlestickListCommandOutput> {
    const queryParameters = getQueryParameters(this.input, false);
    const queryUrl = `/v3/klines?${queryParameters}`;
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<GetCandlestickListOutput>(queryUrl, queryConfig));
  }
}

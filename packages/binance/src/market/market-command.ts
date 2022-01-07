import { axiosInstance, getQueryConfig, getQueryParameters } from '../common/axios-instance.js';
import { ApiInfoProvider } from '../client.js';
import { Command, CommandOutput } from '../command.js';
import {
  GetAveragePriceInput,
  GetAveragePriceOutput,
  GetCandlestickDataInput,
  GetCandlestickDataOutput,
  GetCurrentPriceInput,
  GetCurrentPriceOutput,
  GetOrderBookPriceInput,
  GetOrderBookPriceOutput,
  GetPriceChangeInput,
  GetPriceChangeOutput,
} from './market.js';

export type GetCandlestickDataCommandOutput = CommandOutput<GetCandlestickDataOutput>;

export class GetCandlestickDataCommand extends Command<GetCandlestickDataCommandOutput> {
  constructor(readonly input: GetCandlestickDataInput) {
    super();
  }

  async execute(apiInfoProvider: ApiInfoProvider): Promise<GetCandlestickDataCommandOutput> {
    const queryParameters = getQueryParameters(this.input, false);
    const queryUrl = `/v3/klines?${queryParameters}`;
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<GetCandlestickDataOutput>(queryUrl, queryConfig));
  }
}

export type GetAveragePriceCommandOutput = CommandOutput<GetAveragePriceOutput>;

export class GetAveragePriceCommand extends Command<GetAveragePriceCommandOutput> {
  constructor(readonly input: GetAveragePriceInput) {
    super();
  }

  async execute(apiInfoProvider: ApiInfoProvider): Promise<GetAveragePriceCommandOutput> {
    const queryParameters = getQueryParameters(this.input, false);
    const queryUrl = `/v3/avgPrice?${queryParameters}`;
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    return this.handle(() => axiosInstance.get<GetAveragePriceOutput>(queryUrl, queryConfig));
  }
}

export type GetPriceChangeCommandOutput = CommandOutput<GetPriceChangeOutput | GetPriceChangeOutput[]>;

export class GetPriceChangeCommand extends Command<GetPriceChangeCommandOutput> {
  constructor(readonly input?: GetPriceChangeInput) {
    super();
  }

  async execute(apiInfoProvider: ApiInfoProvider): Promise<GetPriceChangeCommandOutput> {
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    if (this.input?.symbol) {
      const queryParameters = getQueryParameters(this.input, false);
      const queryUrl = `/v3/ticker/24hr?${queryParameters}`;

      return this.handle(() => axiosInstance.get<GetPriceChangeOutput>(queryUrl, queryConfig));
    } else {
      const queryUrl = '/v3/ticker/24hr';

      return this.handle(() => axiosInstance.get<GetPriceChangeOutput[]>(queryUrl, queryConfig));
    }
  }
}

export type GetCurrentPriceCommandOutput = CommandOutput<GetCurrentPriceOutput | GetCurrentPriceOutput[]>;

export class GetCurrentPriceCommand extends Command<GetCurrentPriceCommandOutput> {
  constructor(readonly input?: GetCurrentPriceInput) {
    super();
  }

  async execute(apiInfoProvider: ApiInfoProvider): Promise<GetCurrentPriceCommandOutput> {
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    if (this.input?.symbol) {
      const queryParameters = getQueryParameters(this.input, false);
      const queryUrl = `/v3/ticker/price?${queryParameters}`;

      return this.handle(() => axiosInstance.get<GetCurrentPriceOutput>(queryUrl, queryConfig));
    } else {
      const queryUrl = '/v3/ticker/price';

      return this.handle(() => axiosInstance.get<GetCurrentPriceOutput[]>(queryUrl, queryConfig));
    }
  }
}

export type GetOrderBookPriceCommandOutput = CommandOutput<GetOrderBookPriceOutput | GetOrderBookPriceOutput[]>;

export class GetOrderBookPriceCommand extends Command<GetOrderBookPriceCommandOutput> {
  constructor(readonly input?: GetOrderBookPriceInput) {
    super();
  }

  async execute(apiInfoProvider: ApiInfoProvider): Promise<GetOrderBookPriceCommandOutput> {
    const queryConfig = getQueryConfig(await apiInfoProvider.getApiUrl());

    if (this.input?.symbol) {
      const queryParameters = getQueryParameters(this.input, false);
      const queryUrl = `/v3/ticker/bookTicker?${queryParameters}`;

      return this.handle(() => axiosInstance.get<GetOrderBookPriceOutput>(queryUrl, queryConfig));
    } else {
      const queryUrl = '/v3/ticker/bookTicker';

      return this.handle(() => axiosInstance.get<GetOrderBookPriceOutput[]>(queryUrl, queryConfig));
    }
  }
}

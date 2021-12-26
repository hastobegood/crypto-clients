import { AxiosRequestConfig } from 'axios';
import { axiosInstance } from '../common/index.js';
import { BinanceApiResponse, BinanceError, BinancePublicApiProvider } from '../api/index.js';
import { BinanceExchangeInfo } from './binance-exchange-info.js';

export class BinanceExchangeInfoClient {
  constructor(private binancePublicApiProvider: BinancePublicApiProvider) {}

  async getExchangeInfoBySymbol(symbol: string): Promise<BinanceApiResponse<BinanceExchangeInfo>> {
    const queryParameters = `symbol=${symbol}`;
    const queryUrl = `/v3/exchangeInfo?${queryParameters}`;
    const queryConfig = this.#getQueryConfig(await this.binancePublicApiProvider.getApiUrl());

    try {
      const response = await axiosInstance.get<BinanceExchangeInfo>(queryUrl, queryConfig);
      return {
        status: response.status,
        headers: response.headers,
        data: response.data,
      };
    } catch (error) {
      throw new BinanceError(error);
    }
  }

  #getQueryConfig(apiUrl: string): AxiosRequestConfig {
    return {
      baseURL: apiUrl,
    };
  }
}

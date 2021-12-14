import { isAxiosError } from '../common/index.js';

export interface BinanceApiResponse<T> {
  status: number;
  headers: Record<string, string>;
  data: T;
}

export class BinanceError extends Error {
  private response?: BinanceApiResponse<{ code: number; msg: string }>;

  constructor(private cause: unknown) {
    super('Error when calling Binance API');

    if (isAxiosError(cause) && cause.response) {
      this.response = {
        status: cause.response.status,
        headers: cause.response.headers,
        data: cause.response.data,
      };
    }
  }
}

export type CandlestickInterval = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';

export interface GetCandlestickListInput {
  symbol: string;
  interval: CandlestickInterval;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface GetCandlestickListOutput extends Array<[number, string, string, string, string, string, number, string, number, string, string, string]> {}

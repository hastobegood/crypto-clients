export type CandlestickInterval = '1m' | '3m' | '5m' | '15m' | '30m' | '1h' | '2h' | '4h' | '6h' | '8h' | '12h' | '1d' | '3d' | '1w' | '1M';

export interface GetCandlestickDataInput {
  symbol: string;
  interval: CandlestickInterval;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export type GetCandlestickDataOutput = Array<[number, string, string, string, string, string, number, string, number, string, string, string]>;

export interface GetAveragePriceInput {
  symbol: string;
}

export interface GetAveragePriceOutput {
  mins: number;
  price: string;
}

export interface GetPriceChangeInput {
  symbol: string;
}

export type GetPriceChangeOutput = Array<GetPriceChangeOutputSymbol>;

export interface GetPriceChangeOutputSymbol {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;
  lastId: number;
  count: number;
}

export interface GetCurrentPriceInput {
  symbol: string;
}

export type GetCurrentPriceOutput = Array<GetCurrentPriceOutputSymbol>;

export interface GetCurrentPriceOutputSymbol {
  symbol: string;
  price: string;
}

export interface GetOrderBookPriceInput {
  symbol: string;
}

export type GetOrderBookPriceOutput = Array<GetOrderBookPriceOutputSymbol>;

export interface GetOrderBookPriceOutputSymbol {
  symbol: string;
  bidPrice: string;
  bidQty: string;
  askPrice: string;
  askQty: string;
}

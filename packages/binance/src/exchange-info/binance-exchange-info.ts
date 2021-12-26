export interface BinanceExchangeInfo {
  timezone: string;
  serverTime: number;
  rateLimits: BinanceExchangeInfoRateLimit[];
  symbols: BinanceExchangeInfoSymbol[];
}

export interface BinanceExchangeInfoRateLimit {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
}

export interface BinanceExchangeInfoSymbol {
  symbol: string;
  status: string;
  baseAsset: string;
  baseAssetPrecision: number;
  quoteAsset: string;
  quoteAssetPrecision: number;
  baseCommissionPrecision: number;
  quoteCommissionPrecision: number;
  orderTypes: string[];
  icebergAllowed: boolean;
  ocoAllowed: boolean;
  quoteOrderQtyMarketAllowed: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: BinanceExchangeInfoSymbolFilter[];
  permissions: string[];
}

export interface BinanceExchangeInfoSymbolFilter {
  filterType: string;
  minPrice: string;
  maxPrice: string;
  tickSize: string;
}

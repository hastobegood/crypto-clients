export interface GetExchangeInfoInput {
  symbol: string;
}

export interface GetExchangeInfoOutput {
  timezone: string;
  serverTime: number;
  rateLimits: GetExchangeInfoOutputRateLimit[];
  symbols: GetExchangeInfoOutputSymbol[];
}

export interface GetExchangeInfoOutputRateLimit {
  rateLimitType: string;
  interval: string;
  intervalNum: number;
  limit: number;
}

export interface GetExchangeInfoOutputSymbol {
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
  filters: GetExchangeInfoOutputSymbolFilter[];
  permissions: string[];
}

export interface GetExchangeInfoOutputSymbolFilter {
  filterType: string;
  minPrice: string;
  maxPrice: string;
  tickSize: string;
}

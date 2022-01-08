export interface GetServerTimeOutput {
  serverTime: number;
}

export type ExchangeInfoRateLimitType = 'REQUEST_WEIGHT' | 'ORDERS' | 'RAW_REQUESTS';
export type ExchangeInfoRateLimitInterval = 'SECOND' | 'MINUTE' | 'DAY';
export type ExchangeInfoSymbolStatus = 'PRE_TRADING' | 'TRADING' | 'POST_TRADING' | 'END_OF_DAY' | 'HALT' | 'AUCTION_MATCH' | 'BREAK';
export type ExchangeInfoSymbolPermission = 'SPOT' | 'MARGIN' | 'LEVERAGED' | 'TRD_GRP_002';

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
  rateLimitType: ExchangeInfoRateLimitType;
  interval: ExchangeInfoRateLimitInterval;
  intervalNum: number;
  limit: number;
}

export interface GetExchangeInfoOutputSymbol {
  symbol: string;
  status: ExchangeInfoSymbolStatus;
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
  permissions: ExchangeInfoSymbolPermission[];
}

export interface GetExchangeInfoOutputSymbolFilter {
  filterType: string;
  minPrice: string;
  maxPrice: string;
  tickSize: string;
}

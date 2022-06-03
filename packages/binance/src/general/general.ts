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
  allowTrailingStop: boolean;
  isSpotTradingAllowed: boolean;
  isMarginTradingAllowed: boolean;
  filters: GetExchangeInfoOutputSymbolFilter[];
  permissions: ExchangeInfoSymbolPermission[];
}

export type GetExchangeInfoOutputSymbolFilter =
  | {
      filterType: 'PRICE_FILTER';
      minPrice: string;
      maxPrice: string;
      tickSize: string;
    }
  | {
      filterType: 'PERCENT_PRICE';
      multiplierUp: string;
      multiplierDown: string;
      avgPriceMins: number;
    }
  | {
      filterType: 'PERCENT_PRICE_BY_SIDE';
      bidMultiplierUp: string;
      bidMultiplierDown: string;
      askMultiplierUp: string;
      askMultiplierDown: string;
      avgPriceMins: number;
    }
  | {
      filterType: 'LOT_SIZE' | 'MARKET_LOT_SIZE';
      minQty: string;
      maxQty: string;
      stepSize: string;
    }
  | {
      filterType: 'MIN_NOTIONAL';
      minNotional: string;
      applyToMarket: boolean;
      avgPriceMins: string;
    }
  | {
      filterType: 'ICEBERG_PARTS';
      limit: number;
    }
  | {
      filterType: 'MAX_NUM_ORDERS';
      maxNumOrders: number;
    }
  | {
      filterType: 'MAX_NUM_ALGO_ORDERS';
      maxNumAlgoOrders: number;
    }
  | {
      filterType: 'MAX_NUM_ICEBERG_ORDERS';
      maxNumIcebergOrders: number;
    }
  | {
      filterType: 'MAX_POSITION';
      maxPosition: string;
    }
  | {
      filterType: 'TRAILING_DELTA';
      minTrailingAboveDelta: number;
      maxTrailingAboveDelta: number;
      minTrailingBelowDelta: number;
      maxTrailingBelowDelta: number;
    };

import { randomBoolean, randomNumber, randomString, randomSymbol } from '../random-test-builder.js';
import { GetExchangeInfoInput, GetExchangeInfoOutput, GetExchangeInfoOutputRateLimit, GetExchangeInfoOutputSymbol, GetExchangeInfoOutputSymbolFilter } from '../../../src/exchange/exchange.js';

export const buildDefaultGetExchangeInfoInput = (): GetExchangeInfoInput => {
  return {
    symbol: randomSymbol(),
  };
};

export const buildDefaultGetExchangeInfoOutput = (): GetExchangeInfoOutput => {
  return {
    timezone: 'UTC',
    serverTime: new Date().valueOf(),
    rateLimits: [buildDefaultGetExchangeInfoOutputRateLimit(), buildDefaultGetExchangeInfoOutputRateLimit()],
    symbols: [buildDefaultGetExchangeInfoOutputSymbol()],
  };
};

export const buildDefaultGetExchangeInfoOutputRateLimit = (): GetExchangeInfoOutputRateLimit => {
  return {
    rateLimitType: randomString(5),
    interval: randomString(5),
    intervalNum: randomNumber(1, 60),
    limit: randomNumber(100, 500),
  };
};

export const buildDefaultGetExchangeInfoOutputSymbol = (): GetExchangeInfoOutputSymbol => {
  return {
    symbol: randomSymbol(),
    status: randomString(5),
    baseAsset: randomString(5),
    baseAssetPrecision: randomNumber(8, 10),
    quoteAsset: randomString(5),
    quoteAssetPrecision: randomNumber(8, 10),
    baseCommissionPrecision: randomNumber(8, 10),
    quoteCommissionPrecision: randomNumber(8, 10),
    orderTypes: [randomString(5), randomString(5)],
    icebergAllowed: randomBoolean(),
    ocoAllowed: randomBoolean(),
    quoteOrderQtyMarketAllowed: randomBoolean(),
    isSpotTradingAllowed: randomBoolean(),
    isMarginTradingAllowed: randomBoolean(),
    filters: [buildDefaultGetExchangeInfoOutputSymbolFilter(), buildDefaultGetExchangeInfoOutputSymbolFilter()],
    permissions: [randomString(5), randomString(5)],
  };
};

export const buildDefaultGetExchangeInfoOutputSymbolFilter = (): GetExchangeInfoOutputSymbolFilter => {
  return {
    filterType: randomString(5),
    minPrice: randomNumber(1, 100).toString(),
    maxPrice: randomNumber(1_000, 10_000).toString(),
    tickSize: randomNumber(1, 4).toString(),
  };
};

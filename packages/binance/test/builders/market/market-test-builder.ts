import {
  GetAveragePriceInput,
  GetAveragePriceOutput,
  GetCandlestickDataInput,
  GetCandlestickDataOutput,
  GetCurrentPriceInput,
  GetCurrentPriceOutput,
  GetCurrentPriceOutputSymbol,
  GetOrderBookPriceInput,
  GetOrderBookPriceOutput,
  GetOrderBookPriceOutputSymbol,
  GetPriceChangeInput,
  GetPriceChangeOutput,
  GetPriceChangeOutputSymbol,
} from '../../../src/market/market.js';
import { randomFromList, randomNumber, randomPercentage, randomSymbol } from '../random-test-builder.js';

export const buildDefaultGetCandlestickDataInput = (): GetCandlestickDataInput => {
  return {
    symbol: randomSymbol(),
    interval: randomFromList(['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M']),
    startTime: new Date().valueOf(),
    endTime: new Date().valueOf(),
    limit: randomNumber(1, 100),
  };
};

export const buildDefaultGetCandlestickDataOutput = (): GetCandlestickDataOutput => {
  return [1, 2, 3, 4, 5].map(() => [
    new Date().valueOf(),
    randomNumber().toString(),
    randomNumber().toString(),
    randomNumber().toString(),
    randomNumber().toString(),
    randomNumber().toString(),
    new Date().valueOf(),
    randomNumber().toString(),
    randomNumber(1, 1_000),
    randomNumber().toString(),
    randomNumber().toString(),
    randomNumber().toString(),
  ]);
};

export const buildDefaultGetAveragePriceInput = (): GetAveragePriceInput => {
  return {
    symbol: randomSymbol(),
  };
};

export const buildDefaultGetAveragePriceOutput = (): GetAveragePriceOutput => {
  return {
    mins: randomNumber(),
    price: randomNumber().toString(),
  };
};

export const buildDefaultGetPriceChangeInput = (): GetPriceChangeInput => {
  return {
    symbol: randomSymbol(),
  };
};

export const buildDefaultGetPriceChangeOutput = (): GetPriceChangeOutput => {
  return [buildDefaultGetPriceChangeOutputSymbol(), buildDefaultGetPriceChangeOutputSymbol()];
};

export const buildDefaultGetPriceChangeOutputSymbol = (): GetPriceChangeOutputSymbol => {
  return {
    symbol: randomSymbol(),
    priceChange: randomPercentage().toString(),
    priceChangePercent: randomPercentage().toString(),
    weightedAvgPrice: randomNumber().toString(),
    prevClosePrice: randomNumber().toString(),
    lastPrice: randomNumber().toString(),
    lastQty: randomNumber().toString(),
    bidPrice: randomNumber().toString(),
    bidQty: randomNumber().toString(),
    askPrice: randomNumber().toString(),
    askQty: randomNumber().toString(),
    openPrice: randomNumber().toString(),
    highPrice: randomNumber().toString(),
    lowPrice: randomNumber().toString(),
    volume: randomNumber().toString(),
    quoteVolume: randomNumber().toString(),
    openTime: new Date().valueOf(),
    closeTime: new Date().valueOf(),
    firstId: randomNumber(),
    lastId: randomNumber(),
    count: randomNumber(),
  };
};

export const buildDefaultGetCurrentPriceInput = (): GetCurrentPriceInput => {
  return {
    symbol: randomSymbol(),
  };
};

export const buildDefaultGetCurrentPriceOutput = (): GetCurrentPriceOutput => {
  return [buildDefaultGetCurrentPriceOutputSymbol(), buildDefaultGetCurrentPriceOutputSymbol()];
};

export const buildDefaultGetCurrentPriceOutputSymbol = (): GetCurrentPriceOutputSymbol => {
  return {
    symbol: randomSymbol(),
    price: randomNumber().toString(),
  };
};

export const buildDefaultGetOrderBookPriceInput = (): GetOrderBookPriceInput => {
  return {
    symbol: randomSymbol(),
  };
};

export const buildDefaultGetOrderBookPriceOutput = (): GetOrderBookPriceOutput => {
  return [buildDefaultGetOrderBookPriceOutputSymbol(), buildDefaultGetOrderBookPriceOutputSymbol()];
};

export const buildDefaultGetOrderBookPriceOutputSymbol = (): GetOrderBookPriceOutputSymbol => {
  return {
    symbol: randomSymbol(),
    bidPrice: randomNumber().toString(),
    bidQty: randomNumber().toString(),
    askPrice: randomNumber().toString(),
    askQty: randomNumber().toString(),
  };
};

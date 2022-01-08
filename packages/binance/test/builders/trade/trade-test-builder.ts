import { randomBoolean, randomNumber, randomString, randomSymbol } from '../random-test-builder.js';
import {
  GetAccountTradesListInput,
  GetAccountTradesListOutput,
  GetAccountTradesListOutputSymbol,
  GetAggregateTradesListInput,
  GetAggregateTradesListOutput,
  GetAggregateTradesListOutputSymbol,
  GetOldTradesListInput,
  GetOldTradesListOutput,
  GetOldTradesListOutputSymbol,
  GetRecentTradesListInput,
  GetRecentTradesListOutput,
  GetRecentTradesListOutputSymbol,
} from '../../../src/trade/trade.js';

export const buildDefaultGetAccountTradesListInput = (): GetAccountTradesListInput => {
  return {
    symbol: randomSymbol(),
    orderId: randomNumber(),
    startTime: new Date().valueOf(),
    endTime: new Date().valueOf(),
    fromId: randomNumber(),
    limit: randomNumber(1, 100),
  };
};

export const buildDefaultGetAccountTradesListOutput = (): GetAccountTradesListOutput => {
  return [buildDefaultGetAccountTradesListOutputSymbol(), buildDefaultGetAccountTradesListOutputSymbol()];
};

export const buildDefaultGetAccountTradesListOutputSymbol = (): GetAccountTradesListOutputSymbol => {
  return {
    symbol: randomSymbol(),
    id: randomNumber(),
    orderId: randomNumber(),
    orderListId: randomNumber(),
    price: randomNumber(0.01, 1_000).toString(),
    qty: randomNumber(1, 100_000).toString(),
    quoteQty: randomNumber(1, 100_000).toString(),
    commission: randomNumber(1, 100_000).toString(),
    commissionAsset: randomString(3),
    time: new Date().valueOf(),
    isBuyer: randomBoolean(),
    isMaker: randomBoolean(),
    isBestMatch: randomBoolean(),
  };
};

export const buildDefaultGetRecentTradesListInput = (): GetRecentTradesListInput => {
  return {
    symbol: randomSymbol(),
    limit: randomNumber(1, 100),
  };
};

export const buildDefaultGetRecentTradesListOutput = (): GetRecentTradesListOutput => {
  return [buildDefaultGetRecentTradesListOutputSymbol(), buildDefaultGetRecentTradesListOutputSymbol()];
};

export const buildDefaultGetRecentTradesListOutputSymbol = (): GetRecentTradesListOutputSymbol => {
  return {
    id: randomNumber(),
    price: randomNumber(0.01, 1_000).toString(),
    qty: randomNumber(1, 100_000).toString(),
    quoteQty: randomNumber(1, 100_000).toString(),
    time: new Date().valueOf(),
    isBuyerMaker: randomBoolean(),
    isBestMatch: randomBoolean(),
  };
};

export const buildDefaultGetOldTradesListInput = (): GetOldTradesListInput => {
  return {
    symbol: randomSymbol(),
    limit: randomNumber(1, 100),
    fromId: randomNumber(),
  };
};

export const buildDefaultGetOldTradesListOutput = (): GetOldTradesListOutput => {
  return [buildDefaultGetOldTradesListOutputSymbol(), buildDefaultGetOldTradesListOutputSymbol()];
};

export const buildDefaultGetOldTradesListOutputSymbol = (): GetOldTradesListOutputSymbol => {
  return {
    id: randomNumber(),
    price: randomNumber(0.01, 1_000).toString(),
    qty: randomNumber(1, 100_000).toString(),
    quoteQty: randomNumber(1, 100_000).toString(),
    time: new Date().valueOf(),
    isBuyerMaker: randomBoolean(),
    isBestMatch: randomBoolean(),
  };
};

export const buildDefaultGetAggregateTradesListInput = (): GetAggregateTradesListInput => {
  return {
    symbol: randomSymbol(),
    fromId: randomNumber(),
    startTime: new Date().valueOf(),
    endTime: new Date().valueOf(),
    limit: randomNumber(1, 100),
  };
};

export const buildDefaultGetAggregateTradesListOutput = (): GetAggregateTradesListOutput => {
  return [buildDefaultGetAggregateTradesListOutputSymbol(), buildDefaultGetAggregateTradesListOutputSymbol()];
};

export const buildDefaultGetAggregateTradesListOutputSymbol = (): GetAggregateTradesListOutputSymbol => {
  return {
    a: randomNumber(),
    p: randomString(),
    q: randomString(),
    f: randomNumber(),
    l: randomNumber(),
    T: randomNumber(),
    m: randomNumber(),
    M: randomNumber(),
  };
};

import { randomNumber, randomSymbol } from '../random-test-builder.js';
import { GetAccountTradesListInput, GetAggregateTradesListInput, GetOldTradesListInput, GetRecentTradesListInput } from '../../../src/trade/trade.js';

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

export const buildDefaultGetRecentTradesListInput = (): GetRecentTradesListInput => {
  return {
    symbol: randomSymbol(),
    limit: randomNumber(1, 100),
  };
};

export const buildDefaultGetOldTradesListInput = (): GetOldTradesListInput => {
  return {
    symbol: randomSymbol(),
    limit: randomNumber(1, 100),
    fromId: randomNumber(),
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

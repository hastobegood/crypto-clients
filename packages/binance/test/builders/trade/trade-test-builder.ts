import { randomNumber, randomSymbol } from '../random-test-builder.js';
import { GetTradeListInput } from '../../../src/trade/trade.js';

export const buildDefaultGetTradeListInput = (): GetTradeListInput => {
  return {
    symbol: randomSymbol(),
    orderId: randomNumber(),
    startTime: new Date().valueOf(),
    endTime: new Date().valueOf(),
    fromId: randomNumber(),
    limit: randomNumber(1, 100),
  };
};

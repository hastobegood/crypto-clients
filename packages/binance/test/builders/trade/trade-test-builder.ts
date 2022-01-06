import { randomNumber, randomSymbol } from '../random-test-builder.js';
import { GetAccountTradeListInput } from '../../../src/trade/trade.js';

export const buildDefaultGetAccountTradeListInput = (): GetAccountTradeListInput => {
  return {
    symbol: randomSymbol(),
    orderId: randomNumber(),
    startTime: new Date().valueOf(),
    endTime: new Date().valueOf(),
    fromId: randomNumber(),
    limit: randomNumber(1, 100),
  };
};

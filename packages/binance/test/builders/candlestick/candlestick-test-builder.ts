import { randomFromList, randomNumber, randomSymbol } from '../random-test-builder.js';
import { GetCandlestickListInput, GetCandlestickListOutput } from '../../../src/candlestick/candlestick.js';

export const buildDefaultGetCandlestickListInput = (): GetCandlestickListInput => {
  return {
    symbol: randomSymbol(),
    interval: randomFromList(['1m', '3m', '5m', '15m', '30m', '1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w', '1M']),
    startTime: new Date().valueOf(),
    endTime: new Date().valueOf(),
    limit: randomNumber(1, 100),
  };
};

export const buildDefaultGetCandlestickListOutput = (): GetCandlestickListOutput => {
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

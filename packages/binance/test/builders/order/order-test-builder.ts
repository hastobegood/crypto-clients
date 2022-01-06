import { randomFromList, randomNumber, randomString, randomSymbol } from '../random-test-builder.js';
import { CancelOrderInput, GetOrderInput, SendOrderInput } from '../../../src/order/order.js';

export const buildDefaultSendOrderInput = (): SendOrderInput => {
  return {
    symbol: randomSymbol(),
    side: randomFromList(['BUY', 'SELL']),
    type: randomFromList(['MARKET', 'LIMIT', 'STOP_LOSS', 'STOP_LOSS_LIMIT', 'TAKE_PROFIT', 'TAKE_PROFIT_LIMIT', 'LIMIT_MAKER']),
    timeInForce: randomFromList(['GTC', 'IOC', 'FOK']),
    quantity: randomNumber(1, 100_000),
    quoteOrderQty: randomNumber(1, 100_000),
    price: randomNumber(0.01, 1_000),
    newClientOrderId: randomString(),
    stopPrice: randomNumber(0.01, 1_000),
    icebergQty: randomNumber(1, 100_000),
  };
};

export const buildDefaultGetOrderInput = (): GetOrderInput => {
  return {
    symbol: randomSymbol(),
    orderId: randomNumber(),
  };
};

export const buildDefaultCancelOrderInput = (): CancelOrderInput => {
  return {
    symbol: randomSymbol(),
    orderId: randomNumber(),
    origClientOrderId: randomString(),
    newClientOrderId: randomString(),
  };
};

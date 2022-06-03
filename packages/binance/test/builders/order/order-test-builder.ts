import {
  CancelOrderInput,
  CancelOrderOutput,
  GetAllOrdersListInput,
  GetAllOrdersListOutput,
  GetOpenOrdersListInput,
  GetOpenOrdersListOutput,
  GetOrderCountUsageOutput,
  GetOrderCountUsageOutputInterval,
  GetOrderInput,
  GetOrderOutput,
  SendOrderInput,
  SendOrderOutput,
  SendOrderOutputFill,
} from '../../../src/order/order.js';
import { randomBoolean, randomFromList, randomNumber, randomString, randomSymbol } from '../random-test-builder.js';

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
    trailingDelta: randomNumber(10, 2_000),
    icebergQty: randomNumber(1, 100_000),
  };
};

export const buildDefaultSendOrderOutput = (): SendOrderOutput => {
  return {
    symbol: randomSymbol(),
    orderId: randomNumber(),
    orderListId: randomNumber(),
    clientOrderId: randomString(),
    transactTime: new Date().valueOf(),
    price: randomNumber(0.01, 1_000).toString(),
    origQty: randomNumber(1, 100_000).toString(),
    executedQty: randomNumber(1, 100_000).toString(),
    cummulativeQuoteQty: randomNumber(1, 100_000).toString(),
    status: randomFromList(['NEW', 'PARTIALLY_FILLED', 'FILLED', 'CANCELED', 'PENDING_CANCEL', 'REJECTED', 'EXPIRED']),
    timeInForce: randomFromList(['GTC', 'IOC', 'FOK']),
    type: randomFromList(['MARKET', 'LIMIT', 'STOP_LOSS', 'STOP_LOSS_LIMIT', 'TAKE_PROFIT', 'TAKE_PROFIT_LIMIT', 'LIMIT_MAKER']),
    side: randomFromList(['BUY', 'SELL']),
    fills: [buildDefaultSendOrderOutputFill(), buildDefaultSendOrderOutputFill()],
  };
};

export const buildDefaultSendOrderOutputFill = (): SendOrderOutputFill => {
  return {
    price: randomNumber(0.01, 1_000).toString(),
    qty: randomNumber(1, 100_000).toString(),
    commission: randomNumber(1, 100_000).toString(),
    commissionAsset: randomString(3),
    tradeId: randomNumber(),
  };
};

export const buildDefaultGetOrderInput = (): GetOrderInput => {
  return {
    symbol: randomSymbol(),
    orderId: randomNumber(),
  };
};

export const buildDefaultGetOrderOutput = (): GetOrderOutput => {
  return {
    symbol: randomSymbol(),
    orderId: randomNumber(),
    orderListId: randomNumber(),
    clientOrderId: randomString(),
    price: randomNumber(0.01, 1_000).toString(),
    origQty: randomNumber(1, 100_000).toString(),
    executedQty: randomNumber(1, 100_000).toString(),
    cummulativeQuoteQty: randomNumber(1, 100_000).toString(),
    status: randomFromList(['NEW', 'PARTIALLY_FILLED', 'FILLED', 'CANCELED', 'PENDING_CANCEL', 'REJECTED', 'EXPIRED']),
    timeInForce: randomFromList(['GTC', 'IOC', 'FOK']),
    type: randomFromList(['MARKET', 'LIMIT', 'STOP_LOSS', 'STOP_LOSS_LIMIT', 'TAKE_PROFIT', 'TAKE_PROFIT_LIMIT', 'LIMIT_MAKER']),
    side: randomFromList(['BUY', 'SELL']),
    stopPrice: randomNumber(0.01, 1_000).toString(),
    icebergQty: randomNumber(1, 100_000).toString(),
    time: new Date().valueOf(),
    updateTime: new Date().valueOf(),
    isWorking: randomBoolean(),
    origQuoteOrderQty: randomNumber(1, 100_000).toString(),
  };
};

export const buildDefaultGetOpenOrdersListInput = (): GetOpenOrdersListInput => {
  return {
    symbol: randomSymbol(),
  };
};

export const buildDefaultGetOpenOrdersListOutput = (): GetOpenOrdersListOutput => {
  return [buildDefaultGetOrderOutput(), buildDefaultGetOrderOutput()];
};

export const buildDefaultGetAllOrdersListInput = (): GetAllOrdersListInput => {
  return {
    symbol: randomSymbol(),
    orderId: randomNumber(),
    startTime: new Date().valueOf(),
    endTime: new Date().valueOf(),
    limit: randomNumber(100, 100_000),
  };
};

export const buildDefaultGetAllOrdersListOutput = (): GetAllOrdersListOutput => {
  return [buildDefaultGetOrderOutput(), buildDefaultGetOrderOutput()];
};

export const buildDefaultCancelOrderInput = (): CancelOrderInput => {
  return {
    symbol: randomSymbol(),
    orderId: randomNumber(),
    origClientOrderId: randomString(),
    newClientOrderId: randomString(),
  };
};

export const buildDefaultCancelOrderOutput = (): CancelOrderOutput => {
  return {
    symbol: randomSymbol(),
    origClientOrderId: randomString(),
    orderId: randomNumber(),
    orderListId: randomNumber(),
    clientOrderId: randomString(),
    price: randomNumber(0.01, 1_000).toString(),
    origQty: randomNumber(1, 100_000).toString(),
    executedQty: randomNumber(1, 100_000).toString(),
    cummulativeQuoteQty: randomNumber(1, 100_000).toString(),
    status: randomFromList(['NEW', 'PARTIALLY_FILLED', 'FILLED', 'CANCELED', 'PENDING_CANCEL', 'REJECTED', 'EXPIRED']),
    timeInForce: randomFromList(['GTC', 'IOC', 'FOK']),
    type: randomFromList(['MARKET', 'LIMIT', 'STOP_LOSS', 'STOP_LOSS_LIMIT', 'TAKE_PROFIT', 'TAKE_PROFIT_LIMIT', 'LIMIT_MAKER']),
    side: randomFromList(['BUY', 'SELL']),
  };
};

export const buildDefaultGetOrderCountUsageOutput = (): GetOrderCountUsageOutput => {
  return [buildDefaultGetOrderCountUsageOutputInterval(), buildDefaultGetOrderCountUsageOutputInterval()];
};

export const buildDefaultGetOrderCountUsageOutputInterval = (): GetOrderCountUsageOutputInterval => {
  return {
    rateLimitType: 'ORDERS',
    interval: randomFromList(['SECOND', 'DAY']),
    intervalNum: randomNumber(1, 100),
    limit: randomNumber(100, 100_000),
    count: randomNumber(1, 100),
  };
};

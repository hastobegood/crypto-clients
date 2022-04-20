export type OrderSide = 'BUY' | 'SELL';
export type OrderType = 'MARKET' | 'LIMIT' | 'STOP_LOSS' | 'STOP_LOSS_LIMIT' | 'TAKE_PROFIT' | 'TAKE_PROFIT_LIMIT' | 'LIMIT_MAKER';
export type OrderStatus = 'NEW' | 'PARTIALLY_FILLED' | 'FILLED' | 'CANCELED' | 'PENDING_CANCEL' | 'REJECTED' | 'EXPIRED';
export type OrderTimeInForce = 'GTC' | 'IOC' | 'FOK';

export interface SendOrderInput {
  symbol: string;
  side: OrderSide;
  type: OrderType;
  timeInForce?: OrderTimeInForce;
  quantity?: number;
  quoteOrderQty?: number;
  price?: number;
  newClientOrderId?: string;
  stopPrice?: number;
  icebergQty?: number;
}

export interface SendOrderOutput {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  transactTime: number;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: OrderStatus;
  timeInForce: OrderTimeInForce;
  type: OrderType;
  side: OrderSide;
  fills: SendOrderOutputFill[];
}

export interface SendOrderOutputFill {
  price: string;
  qty: string;
  commission: string;
  commissionAsset: string;
  tradeId: number;
}

export interface GetOrderInput {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
}

export interface GetOrderOutput {
  symbol: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: OrderStatus;
  timeInForce: OrderTimeInForce;
  type: OrderType;
  side: OrderSide;
  stopPrice: string;
  icebergQty: string;
  time: number;
  updateTime: number;
  isWorking: boolean;
  origQuoteOrderQty: string;
}

export interface GetOpenOrdersListInput {
  symbol: string;
}

export type GetOpenOrdersListOutput = Array<GetOrderOutput>;

export interface GetAllOrdersListInput {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export type GetAllOrdersListOutput = Array<GetOrderOutput>;

export interface CancelOrderInput {
  symbol: string;
  orderId?: number;
  origClientOrderId?: string;
  newClientOrderId?: string;
}

export interface CancelOrderOutput {
  symbol: string;
  origClientOrderId: string;
  orderId: number;
  orderListId: number;
  clientOrderId: string;
  price: string;
  origQty: string;
  executedQty: string;
  cummulativeQuoteQty: string;
  status: OrderStatus;
  timeInForce: OrderTimeInForce;
  type: OrderType;
  side: OrderSide;
}

export type OrderCountUsageRateLimitType = 'ORDERS';
export type OrderCountUsageRateLimitInterval = 'SECOND' | 'DAY';

export type GetOrderCountUsageOutput = Array<GetOrderCountUsageOutputInterval>;

export interface GetOrderCountUsageOutputInterval {
  rateLimitType: OrderCountUsageRateLimitType;
  interval: OrderCountUsageRateLimitInterval;
  intervalNum: number;
  limit: number;
  count: number;
}

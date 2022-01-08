export interface GetAccountTradesListInput {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  fromId?: number;
  limit?: number;
}

export interface GetAccountTradesListOutput extends Array<GetAccountTradesListOutputSymbol> {}

export interface GetAccountTradesListOutputSymbol {
  symbol: string;
  id: number;
  orderId: number;
  orderListId: number;
  price: string;
  qty: string;
  quoteQty: string;
  commission: string;
  commissionAsset: string;
  time: number;
  isBuyer: boolean;
  isMaker: boolean;
  isBestMatch: boolean;
}

export interface GetRecentTradesListInput {
  symbol: string;
  limit?: number;
}

export interface GetRecentTradesListOutput extends Array<GetRecentTradesListOutputSymbol> {}

export interface GetRecentTradesListOutputSymbol {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

export interface GetOldTradesListInput {
  symbol: string;
  limit?: number;
  fromId?: number;
}

export interface GetOldTradesListOutput extends Array<GetOldTradesListOutputSymbol> {}

export interface GetOldTradesListOutputSymbol {
  id: number;
  price: string;
  qty: string;
  quoteQty: string;
  time: number;
  isBuyerMaker: boolean;
  isBestMatch: boolean;
}

export interface GetAggregateTradesListInput {
  symbol: string;
  fromId?: number;
  startTime?: number;
  endTime?: number;
  limit?: number;
}

export interface GetAggregateTradesListOutput extends Array<GetAggregateTradesListOutputSymbol> {}

export interface GetAggregateTradesListOutputSymbol {
  a: number;
  p: string;
  q: string;
  f: number;
  l: number;
  T: number;
  m: number;
  M: number;
}

export interface GetAccountTradeListInput {
  symbol: string;
  orderId?: number;
  startTime?: number;
  endTime?: number;
  fromId?: number;
  limit?: number;
}

export interface GetAccountTradeListOutput {
  symbol: string;
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

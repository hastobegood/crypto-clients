export interface GetAccountInfoOutput {
  makerCommission: number;
  takerCommission: number;
  buyerCommission: number;
  sellerCommission: number;
  canTrade: boolean;
  canWithdraw: boolean;
  canDeposit: boolean;
  updateTime: number;
  accountType: string;
  balances: GetAccountInfoOutputBalance[];
  permissions: string[];
}

export interface GetAccountInfoOutputBalance {
  asset: string;
  free: string;
  locked: string;
}

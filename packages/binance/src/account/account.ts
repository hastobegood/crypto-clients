export type AccountInfoSymbolPermission = 'SPOT' | 'MARGIN' | 'LEVERAGED' | 'TRD_GRP_002';

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
  permissions: AccountInfoSymbolPermission[];
}

export interface GetAccountInfoOutputBalance {
  asset: string;
  free: string;
  locked: string;
}

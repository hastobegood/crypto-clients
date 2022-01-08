import { randomBoolean, randomFromList, randomNumber, randomString } from '../random-test-builder.js';
import { GetAccountInfoOutput, GetAccountInfoOutputBalance } from '../../../src/account/account.js';

export const buildDefaultGetAccountInfoOutput = (): GetAccountInfoOutput => {
  return {
    makerCommission: randomNumber(),
    takerCommission: randomNumber(),
    buyerCommission: randomNumber(),
    sellerCommission: randomNumber(),
    canTrade: randomBoolean(),
    canWithdraw: randomBoolean(),
    canDeposit: randomBoolean(),
    updateTime: new Date().valueOf(),
    accountType: randomString(5),
    balances: [buildDefaultGetAccountInfoOutputBalance(), buildDefaultGetAccountInfoOutputBalance()],
    permissions: [randomFromList(['SPOT', 'MARGIN']), randomFromList(['LEVERAGED', 'TRD_GRP_002'])],
  };
};

export const buildDefaultGetAccountInfoOutputBalance = (): GetAccountInfoOutputBalance => {
  return {
    asset: randomString(5),
    free: randomNumber(100, 1_000).toString(),
    locked: randomNumber(0, 100).toString(),
  };
};

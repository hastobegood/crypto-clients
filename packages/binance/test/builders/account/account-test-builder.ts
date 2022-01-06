import { randomBoolean, randomNumber, randomString } from '../random-test-builder.js';
import { GetAccountInfoInput, GetAccountInfoOutput, GetAccountInfoOutputBalance } from '../../../src/account/account.js';

export const buildDefaultGetAccountInfoInput = (): GetAccountInfoInput => {
  return {};
};

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
    permissions: [randomString(5), randomString(5)],
  };
};

export const buildDefaultGetAccountInfoOutputBalance = (): GetAccountInfoOutputBalance => {
  return {
    asset: randomString(5),
    free: randomNumber(100, 1_000).toString(),
    locked: randomNumber(0, 100).toString(),
  };
};

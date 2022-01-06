# Binance

* [Exchange website](https://www.binance.com/)
* [API documentation](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md)

## Clients

* [Account](#account)
* [Exchange](#exchange)
* [Order](#order)

### Account

```typescript
import { Client } from '@hastobegood/crypto-clients-binance';

const client = new Client({
  getApiUrl: async (): Promise<string> => 'binance-api-url',
  getApiKey: async (): Promise<string> => 'binance-api-key',
  getSecretKey: async (): Promise<string> => 'binance-secret-key',
});
```

#### Get account information command

Get current account information.

```typescript
import { GetAccountInfoCommand, GetAccountInfoCommandInput, GetAccountInfoCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetAccountInfoCommandInput = {};

const output: GetAccountInfoCommandOutput = await client.send(new GetAccountInfoCommand(input));
console.log(`Output data: ${output.data}`);
```

### Exchange

```typescript
import { Client } from '@hastobegood/crypto-clients-binance';

const client = new Client({
  getApiUrl: async (): Promise<string> => 'binance-api-url',
});
```

#### Get exchange information command

Return current exchange trading rules and symbol information.

```typescript
import { GetExchangeInfoCommand, GetExchangeInfoCommandInput, GetExchangeInfoCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetExchangeInfoCommandInput = {
  data: {
    symbol: 'BTCUSDT',
  },
};

const output: GetExchangeInfoCommandOutput = await client.send(new GetExchangeInfoCommand(input));
console.log(`Output data: ${output.data}`);
```

### Order

```typescript
import { Client } from '@hastobegood/crypto-clients-binance';

const client = new Client({
  getApiUrl: async (): Promise<string> => 'binance-api-url',
  getApiKey: async (): Promise<string> => 'binance-api-key',
  getSecretKey: async (): Promise<string> => 'binance-secret-key',
});
```

#### Send order command

Send in a new order.

```typescript
import { SendOrderCommand, SendOrderCommandInput, SendOrderCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: SendOrderCommandInput = {
  data: {
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'MARKET',
    quoteOrderQty: 100,
  },
};

const output: SendOrderCommandOutput = await client.send(new SendOrderCommand(input));
console.log(`Output data: ${output.data}`);
```

#### Query order command

Check an order's status.

```typescript
import { QueryOrderCommand, QueryOrderCommandInput, QueryOrderCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: QueryOrderCommandInput = {
  data: {
    symbol: 'BTCUSDT',
    orderId: 123456789,
  },
};

const output: QueryOrderCommandOutput = await client.send(new QueryOrderCommand(input));
console.log(`Output data: ${output.data}`);
```

#### Cancel order command

Cancel an active order.

```typescript
import { CancelOrderCommand, CancelOrderCommandInput, CancelOrderCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: CancelOrderCommandInput = {
  data: {
    symbol: 'BTCUSDT',
    orderId: 123456789,
  },
};

const output: CancelOrderCommandOutput = await client.send(new CancelOrderCommand(input));
console.log(`Output data: ${output.data}`);
```

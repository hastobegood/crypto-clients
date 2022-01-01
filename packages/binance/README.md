# Binance

* [Exchange website](https://www.binance.com/)
* [API documentation](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md)

## Clients

* [Exchange information](#exchange-information)
* [Order](#order)

### Exchange information

```typescript
import { ExchangeInfoClient } from '@hastobegood/crypto-clients-binance/exchange-info';

const exchangeInfoClient = new ExchangeInfoClient({
  getApiUrl: async (): Promise<string> => 'binance-api-url',
});
```

#### Get exchange information command

Return current exchange trading rules and symbol information.

```typescript
import { GetExchangeInfoCommand, GetExchangeInfoCommandInput, GetExchangeInfoCommandOutput } from "@hastobegood/crypto-clients-binance/exchange-info";

const input: GetExchangeInfoCommandInput = {
  data: {
    symbol: 'BTCUSDT',
  },
};

const output: GetExchangeInfoCommandOutput = await this.exchangeInfoClient.send(new GetExchangeInfoCommand(input));
console.log(`Output data: ${output.data}`);
```

### Order

```typescript
import { OrderClient } from '@hastobegood/crypto-clients-binance/order';

const orderClient = new OrderClient({
  getApiUrl: async (): Promise<string> => 'binance-api-url',
  getApiKey: async (): Promise<string> => 'binance-api-key',
  getSecretKey: async (): Promise<string> => 'binance-secret-key',
});
```

#### Send order command

Send in a new order.

```typescript
import { SendOrderCommand, SendOrderCommandInput, SendOrderCommandOutput } from '@hastobegood/crypto-clients-binance/order';

const input: SendOrderCommandInput = {
  data: {
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'MARKET',
    quoteOrderQty: 100,
  },
};

const output: SendOrderCommandOutput = await this.orderClient.send(new SendOrderCommand(input));
console.log(`Output data: ${output.data}`);
```

#### Query order command

Check an order's status.

```typescript
import { QueryOrderCommand, QueryOrderCommandInput, QueryOrderCommandOutput } from '@hastobegood/crypto-clients-binance/order';

const input: QueryOrderCommandInput = {
  data: {
    symbol: 'BTCUSDT',
    side: 'BUY',
    type: 'MARKET',
    quoteOrderQty: 100,
  },
};

const output: QueryOrderCommandOutput = await this.orderClient.send(new QueryOrderCommand(input));
console.log(`Output data: ${output.data}`);
```

# Binance

* [Exchange website](https://www.binance.com/)
* [API documentation](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md)

## Client

### Unsecured endpoints

```typescript
import { Client } from '@hastobegood/crypto-clients-binance';

const client = new Client({
  getApiUrl: async (): Promise<string> => 'binance-api-url',
});
```

### Secured endpoints

```typescript
import { Client } from '@hastobegood/crypto-clients-binance';

const client = new Client({
  getApiUrl: async (): Promise<string> => 'binance-api-url',
  getApiKey: async (): Promise<string> => 'binance-api-key',
  getSecretKey: async (): Promise<string> => 'binance-secret-key',
});
```

## Commands

* [Account](#account)
* [Candlestick](#candlestick)
* [General](#general)
* [Order](#order)
* [Trade](#trade)

### Account

#### Get account information command

Get current account information.

```typescript
import { GetAccountInfoCommand, GetAccountInfoCommandOutput } from '@hastobegood/crypto-clients-binance';

const output: GetAccountInfoCommandOutput = await client.send(new GetAccountInfoCommand());
```

### Candlestick

#### Get candlestick list command

Kline/candlestick bars for a symbol. Klines are uniquely identified by their open time.

```typescript
import { GetCandlestickListCommand, GetCandlestickListCommandInput, GetCandlestickListCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetCandlestickListCommandInput = {
  data: {
    symbol: 'BTCUSDT',
    interval: '1m',
  },
};

const output: GetCandlestickListCommandOutput = await client.send(new GetCandlestickListCommand(input));
```

### General

#### Test connectivity command

Test connectivity to the Rest API.

```typescript
import { TestConnectivityCommand, EmptyCommandOutput } from '@hastobegood/crypto-clients-binance';

const output: EmptyCommandOutput = await client.send(new TestConnectivityCommand());
```

#### Get server time command

Test connectivity to the Rest API and get the current server time.

```typescript
import { GetServerTimeCommand, GetServerTimeCommandOutput } from '@hastobegood/crypto-clients-binance';

const output: GetServerTimeCommandOutput = await client.send(new GetServerTimeCommand());
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
```

### Order

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
```

#### Get order command

Check an order's status.

```typescript
import { GetOrderCommand, GetOrderCommandInput, GetOrderCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetOrderCommandInput = {
  data: {
    symbol: 'BTCUSDT',
    orderId: 123456789,
  },
};

const output: GetOrderCommandOutput = await client.send(new GetOrderCommand(input));
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
```

### Trade

#### Get trade list command

Get trades for a specific account and symbol.

```typescript
import { GetTradeListCommand, GetTradeListCommandInput, GetTradeListCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetTradeListCommandInput = {
  data: {
    symbol: 'BTCUSDT',
  },
};

const output: GetTradeListCommandOutput = await client.send(new GetTradeListCommand(input));
```

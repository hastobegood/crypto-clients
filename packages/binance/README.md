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
* [General](#general)
* [Market](#market)
* [Order](#order)
* [Trade](#trade)

### Account

#### Get account information

```typescript
import { GetAccountInfoCommand, GetAccountInfoCommandOutput } from '@hastobegood/crypto-clients-binance';

const output: GetAccountInfoCommandOutput = await client.send(new GetAccountInfoCommand());
```

### General

#### Test connectivity

```typescript
import { TestConnectivityCommand, EmptyCommandOutput } from '@hastobegood/crypto-clients-binance';

const output: EmptyCommandOutput = await client.send(new TestConnectivityCommand());
```

#### Get server time

```typescript
import { GetServerTimeCommand, GetServerTimeCommandOutput } from '@hastobegood/crypto-clients-binance';

const output: GetServerTimeCommandOutput = await client.send(new GetServerTimeCommand());
```

#### Get exchange information

```typescript
import { GetExchangeInfoCommand, GetExchangeInfoCommandInput, GetExchangeInfoCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetExchangeInfoCommandInput = {
  symbol: 'BTCUSDT',
};

const output: GetExchangeInfoCommandOutput = await client.send(new GetExchangeInfoCommand(input));
```

### Market

#### Get candlestick data

```typescript
import { GetCandlestickDataCommand, GetCandlestickDataCommandInput, GetCandlestickDataCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetCandlestickDataCommandInput = {
  symbol: 'BTCUSDT',
  interval: '1m',
};

const output: GetCandlestickDataCommandOutput = await client.send(new GetCandlestickDataCommand(input));
```

#### Get average price

```typescript
import { GetAveragePriceCommand, GetAveragePriceCommandInput, GetAveragePriceCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetAveragePriceCommandInput = {
  symbol: 'BTCUSDT',
};

const output: GetAveragePriceCommandOutput = await client.send(new GetAveragePriceCommand(input));
```

#### Get price change

```typescript
import { GetPriceChangeCommand, GetPriceChangeCommandInput, GetPriceChangeCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetPriceChangeCommandInput = {
  symbol: 'BTCUSDT',
};

const output: GetPriceChangeCommandOutput = await client.send(new GetPriceChangeCommand(input));
```

#### Get current price

```typescript
import { GetCurrentPriceCommand, GetCurrentPriceCommandInput, GetCurrentPriceCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetCurrentPriceCommandInput = {
  symbol: 'BTCUSDT',
};

const output: GetCurrentPriceCommandOutput = await client.send(new GetCurrentPriceCommand(input));
```

#### Get order book price

```typescript
import { GetOrderBookPriceCommand, GetOrderBookPriceCommandInput, GetOrderBookPriceCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetOrderBookPriceCommandInput = {
  symbol: 'BTCUSDT',
};

const output: GetOrderBookPriceCommandOutput = await client.send(new GetOrderBookPriceCommand(input));
```

### Order

#### Send order

```typescript
import { SendOrderCommand, SendOrderCommandInput, SendOrderCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: SendOrderCommandInput = {
  symbol: 'BTCUSDT',
  side: 'BUY',
  type: 'MARKET',
  quoteOrderQty: 100,
};

const output: SendOrderCommandOutput = await client.send(new SendOrderCommand(input));
```

#### Get order

```typescript
import { GetOrderCommand, GetOrderCommandInput, GetOrderCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetOrderCommandInput = {
  symbol: 'BTCUSDT',
  orderId: 123456789,
};

const output: GetOrderCommandOutput = await client.send(new GetOrderCommand(input));
```

#### Cancel order

```typescript
import { CancelOrderCommand, CancelOrderCommandInput, CancelOrderCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: CancelOrderCommandInput = {
  symbol: 'BTCUSDT',
  orderId: 123456789,
};

const output: CancelOrderCommandOutput = await client.send(new CancelOrderCommand(input));
```

### Trade

#### Get account trade list

```typescript
import { GetAccountTradeListCommand, GetAccountTradeListCommandInput, GetAccountTradeListCommandOutput } from '@hastobegood/crypto-clients-binance';

const input: GetAccountTradeListCommandInput = {
  symbol: 'BTCUSDT',
};

const output: GetAccountTradeListCommandOutput = await client.send(new GetAccountTradeListCommand(input));
```

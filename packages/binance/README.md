# Binance

* [Exchange website](https://www.binance.com/)
* [API documentation](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md)

## Clients

* [Exchange information](#exchange-information)

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
import {
  GetExchangeInfoCommand,
  GetExchangeInfoCommandInput,
  GetExchangeInfoCommandOutput
} from '@hastobegood/crypto-clients-binance';

const input: GetExchangeInfoCommandInput = {
  data: {
    symbol: 'BTCUSDT',
  },
};

const output: GetExchangeInfoCommandOutput = await this.exchangeInfoClient.send(new GetExchangeInfoCommand(input));
console.log(`Output data: ${output.data}`);
```

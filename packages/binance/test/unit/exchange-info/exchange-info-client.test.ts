import { mocked } from 'ts-jest/utils';
import { ApiInfoProvider } from '../../../src/api/api-info-provider.js';
import { ExchangeInfoClient } from '../../../src/exchange-info/exchange-info-client.js';
import { buildDefaultTestCommand } from '../../builders/common/command-test-builder.js';

const apiInfoProviderMock = mocked(jest.genMockFromModule<ApiInfoProvider>('../../../src/api/index.js'), true);

describe('ExchangeInfoClient', () => {
  let exchangeInfoClient: ExchangeInfoClient;
  beforeEach(() => {
    exchangeInfoClient = new ExchangeInfoClient(apiInfoProviderMock);
  });

  describe('Given a command to send', () => {
    describe('When success', () => {
      it('Then command output is returned', async () => {
        const result = await exchangeInfoClient.send(buildDefaultTestCommand());
        expect(result).toEqual('output');
      });
    });
  });
});

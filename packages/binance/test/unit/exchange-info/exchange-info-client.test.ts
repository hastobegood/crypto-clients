import { mocked } from 'ts-jest/utils';
import { Command } from '../../../src/common/command.js';
import { ApiInfoProvider } from '../../../src/api/api-info-provider.js';
import { ExchangeInfoClient } from '../../../src/exchange-info/exchange-info-client.js';

const apiInfoProviderMock = mocked(jest.genMockFromModule<ApiInfoProvider>('../../../src/api/index.js'), true);

let exchangeInfoClient: ExchangeInfoClient;
beforeEach(() => {
  exchangeInfoClient = new ExchangeInfoClient(apiInfoProviderMock);
});

describe('ExchangeInfoClient', () => {
  describe('Given a command to send', () => {
    describe('When success', () => {
      it('Then command output is returned', async () => {
        const result = await exchangeInfoClient.send(new TestCommand('input'));
        expect(result).toEqual('output');
      });
    });
  });
});

class TestCommand extends Command<string, string> {
  constructor(readonly input: string) {
    super();
  }

  async execute(apiInfoProvider: ApiInfoProvider): Promise<string> {
    return 'output';
  }
}

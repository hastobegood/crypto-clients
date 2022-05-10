import { ApiInfoProvider, Client } from '../../src/client.js';
import { buildDefaultTestCommand } from '../builders/common/command-test-builder.js';

const apiInfoProviderMock = jest.mocked(jest.genMockFromModule<ApiInfoProvider>('../../src/client.js'), true);

describe('Client', () => {
  let client: Client;
  beforeEach(() => {
    client = new Client({
      apiInfoProvider: apiInfoProviderMock,
      httpOptions: {
        timeout: 666,
      },
    });
  });

  describe('Given a command to send', () => {
    describe('When success', () => {
      it('Then command output is returned', async () => {
        const result = await client.send(buildDefaultTestCommand());
        expect(result).toEqual('output');
      });
    });
  });
});

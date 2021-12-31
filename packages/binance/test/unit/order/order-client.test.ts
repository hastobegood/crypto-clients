import { mocked } from 'ts-jest/utils';
import { SecuredApiInfoProvider } from '../../../src/api/api-info-provider.js';
import { OrderClient } from '../../../src/order/order-client.js';
import { buildDefaultTestCommand } from '../../builders/common/command-test-builder.js';

const apiInfoProviderMock = mocked(jest.genMockFromModule<SecuredApiInfoProvider>('../../../src/api/index.js'), true);

describe('OrderClient', () => {
  let orderClient: OrderClient;
  beforeEach(() => {
    orderClient = new OrderClient(apiInfoProviderMock);
  });

  describe('Given a command to send', () => {
    describe('When success', () => {
      it('Then command output is returned', async () => {
        const result = await orderClient.send(buildDefaultTestCommand());
        expect(result).toEqual('output');
      });
    });
  });
});

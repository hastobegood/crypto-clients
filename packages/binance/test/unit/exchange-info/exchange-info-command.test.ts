import { mocked } from 'ts-jest/utils';
import { axiosInstance } from '../../../src/common/axios-instance.js';
import { CommandError } from '../../../src/common/command.js';
import { ApiInfoProvider } from '../../../src/api/api-info-provider.js';
import { GetExchangeInfoCommand, GetExchangeInfoCommandInput, GetExchangeInfoCommandOutput } from '../../../src/exchange-info/exchange-info-command.js';
import { buildDefaultGetExchangeInfoOutput } from '../../builders/exchange-info/exchange-info-test-builder.js';

const apiInfoProviderMock = mocked(jest.genMockFromModule<ApiInfoProvider>('../../../src/api/index.js'), true);
const axiosInstanceMock = mocked(axiosInstance, true);

beforeEach(() => {
  apiInfoProviderMock.getApiUrl = jest.fn();
  axiosInstanceMock.get = jest.fn();
});

describe('ExchangeInfoCommand', () => {
  describe('Given a GetExchangeInfoCommand to execute', () => {
    let input: GetExchangeInfoCommandInput;

    beforeEach(() => {
      input = {
        data: {
          symbol: 'ABCDEF',
        },
      };

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('my-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual('/v3/exchangeInfo?symbol=ABCDEF');
      expect(getParams[1]).toEqual({
        baseURL: 'my-url',
      });
    });

    describe('When success', () => {
      let output: GetExchangeInfoCommandOutput;

      beforeEach(() => {
        output = {
          status: 200,
          headers: {
            limit: '666',
            time: '1',
          },
          data: buildDefaultGetExchangeInfoOutput(),
        };

        axiosInstanceMock.get.mockResolvedValueOnce({
          status: output.status,
          headers: output.headers,
          request: 'whatever',
          data: output.data,
        });
      });

      it('Then execution result is returned', async () => {
        const result = await new GetExchangeInfoCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetExchangeInfoCommand(input).execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Error when executing command');
        }
      });
    });
  });
});

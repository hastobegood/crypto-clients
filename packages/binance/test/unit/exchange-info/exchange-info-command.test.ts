import { mocked } from 'ts-jest/utils';
import { axiosInstance, getQueryParameters } from '../../../src/common/axios-instance.js';
import { ApiInfoProvider } from '../../../src/api/api-info-provider.js';
import { CommandError } from '../../../src/common/command.js';
import { GetExchangeInfoCommand, GetExchangeInfoCommandInput, GetExchangeInfoCommandOutput } from '../../../src/exchange-info/exchange-info-command.js';
import { buildDefaultCommandInput, buildDefaultCommandOutput } from '../../builders/common/command-test-builder.js';
import { buildDefaultGetExchangeInfoInput, buildDefaultGetExchangeInfoOutput } from '../../builders/exchange-info/exchange-info-test-builder.js';

const apiInfoProviderMock = mocked(jest.genMockFromModule<ApiInfoProvider>('../../../src/api/index.js'), true);
const axiosInstanceMock = mocked(axiosInstance, true);

describe('ExchangeInfoCommand', () => {
  beforeEach(() => {
    apiInfoProviderMock.getApiUrl = jest.fn();

    axiosInstanceMock.get = jest.fn();
  });

  describe('Given a GetExchangeInfoCommand to execute', () => {
    let input: GetExchangeInfoCommandInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultCommandInput(buildDefaultGetExchangeInfoInput());
      queryParameters = getQueryParameters(input.data, false);

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/exchangeInfo?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetExchangeInfoCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetExchangeInfoOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
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
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });
});

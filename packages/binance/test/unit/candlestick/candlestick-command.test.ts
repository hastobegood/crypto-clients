import { mocked } from 'ts-jest/utils';
import { axiosInstance, getQueryParameters } from '../../../src/common/axios-instance.js';
import { ApiInfoProvider } from '../../../src/client.js';
import { CommandError } from '../../../src/command.js';
import { GetCandlestickListCommand, GetCandlestickListCommandOutput } from '../../../src/candlestick/candlestick-command.js';
import { GetCandlestickListInput } from '../../../src/candlestick/candlestick.js';
import { buildDefaultCommandOutput } from '../../builders/common/command-test-builder.js';
import { buildDefaultGetCandlestickListInput, buildDefaultGetCandlestickListOutput } from '../../builders/candlestick/candlestick-test-builder.js';

const apiInfoProviderMock = mocked(jest.genMockFromModule<ApiInfoProvider>('../../../src/client.js'), true);
const axiosInstanceMock = mocked(axiosInstance, true);

describe('CandlestickCommand', () => {
  beforeEach(() => {
    apiInfoProviderMock.getApiUrl = jest.fn();

    axiosInstanceMock.get = jest.fn();
  });

  describe('Given a GetCandlestickListCommand to execute', () => {
    let input: GetCandlestickListInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetCandlestickListInput();
      queryParameters = getQueryParameters(input, false);

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/klines?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetCandlestickListCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetCandlestickListOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetCandlestickListCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetCandlestickListCommand(input).execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });
});

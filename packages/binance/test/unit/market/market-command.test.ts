import { mocked } from 'ts-jest/utils';
import { axiosInstance, getQueryParameters } from '../../../src/common/axios-instance.js';
import { ApiInfoProvider } from '../../../src/client.js';
import { CommandError } from '../../../src/command.js';
import {
  GetAveragePriceCommand,
  GetAveragePriceCommandOutput,
  GetCandlestickListCommand,
  GetCandlestickListCommandOutput,
  GetCurrentPriceCommand,
  GetCurrentPriceCommandOutput,
  GetCurrentPriceListCommand,
  GetCurrentPriceListCommandOutput,
  GetOrderBookPriceCommand,
  GetOrderBookPriceCommandOutput,
  GetOrderBookPriceListCommand,
  GetOrderBookPriceListCommandOutput,
  GetPriceChangeCommand,
  GetPriceChangeCommandOutput,
  GetPriceChangeListCommand,
  GetPriceChangeListCommandOutput,
} from '../../../src/market/market-command.js';
import { GetAveragePriceInput, GetCandlestickListInput, GetCurrentPriceInput, GetOrderBookPriceInput, GetPriceChangeInput } from '../../../src/market/market.js';
import { buildDefaultCommandOutput } from '../../builders/common/command-test-builder.js';
import {
  buildDefaultGetAveragePriceInput,
  buildDefaultGetAveragePriceOutput,
  buildDefaultGetCandlestickListInput,
  buildDefaultGetCandlestickListOutput,
  buildDefaultGetCurrentPriceInput,
  buildDefaultGetCurrentPriceOutput,
  buildDefaultGetOrderBookPriceInput,
  buildDefaultGetOrderBookPriceOutput,
  buildDefaultGetPriceChangeInput,
  buildDefaultGetPriceChangeOutput,
} from '../../builders/market/market-test-builder.js';

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

  describe('Given a GetAveragePriceCommand to execute', () => {
    let input: GetAveragePriceInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetAveragePriceInput();
      queryParameters = getQueryParameters(input, false);

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/avgPrice?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetAveragePriceCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetAveragePriceOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetAveragePriceCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetAveragePriceCommand(input).execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetPriceChangeCommand to execute', () => {
    let input: GetPriceChangeInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetPriceChangeInput();
      queryParameters = getQueryParameters(input, false);

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/ticker/24hr?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetPriceChangeCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetPriceChangeOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetPriceChangeCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetPriceChangeCommand(input).execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetPriceChangeListCommand to execute', () => {
    beforeEach(() => {
      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual('/v3/ticker/24hr');
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetPriceChangeListCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput([buildDefaultGetPriceChangeOutput(), buildDefaultGetPriceChangeOutput()]);

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetPriceChangeListCommand().execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetPriceChangeListCommand().execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetCurrentPriceCommand to execute', () => {
    let input: GetCurrentPriceInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetCurrentPriceInput();
      queryParameters = getQueryParameters(input, false);

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/ticker/price?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetCurrentPriceCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetCurrentPriceOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetCurrentPriceCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetCurrentPriceCommand(input).execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetCurrentPriceListCommand to execute', () => {
    beforeEach(() => {
      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual('/v3/ticker/price');
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetCurrentPriceListCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput([buildDefaultGetCurrentPriceOutput(), buildDefaultGetCurrentPriceOutput()]);

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetCurrentPriceListCommand().execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetCurrentPriceListCommand().execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetOrderBookPriceCommand to execute', () => {
    let input: GetOrderBookPriceInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetOrderBookPriceInput();
      queryParameters = getQueryParameters(input, false);

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/ticker/bookTicker?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetOrderBookPriceCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetOrderBookPriceOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetOrderBookPriceCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetOrderBookPriceCommand(input).execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetOrderBookPriceListCommand to execute', () => {
    beforeEach(() => {
      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual('/v3/ticker/bookTicker');
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetOrderBookPriceListCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput([buildDefaultGetOrderBookPriceOutput(), buildDefaultGetOrderBookPriceOutput()]);

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetOrderBookPriceListCommand().execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetOrderBookPriceListCommand().execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });
});

import { mocked } from 'ts-jest/utils';
import { axiosInstance, getQueryParameters } from '../../../src/common/axios-instance.js';
import { ApiInfoProvider } from '../../../src/client.js';
import { CommandError } from '../../../src/command.js';
import {
  GetAveragePriceCommand,
  GetAveragePriceCommandOutput,
  GetCandlestickDataCommand,
  GetCandlestickDataCommandOutput,
  GetCurrentPriceCommand,
  GetCurrentPriceCommandOutput,
  GetOrderBookPriceCommand,
  GetOrderBookPriceCommandOutput,
  GetPriceChangeCommand,
  GetPriceChangeCommandOutput,
} from '../../../src/market/market-command.js';
import { GetAveragePriceInput, GetCandlestickDataInput, GetCurrentPriceInput, GetOrderBookPriceInput, GetPriceChangeInput } from '../../../src/market/market.js';
import { buildDefaultCommandOutput } from '../../builders/common/command-test-builder.js';
import {
  buildDefaultGetAveragePriceInput,
  buildDefaultGetAveragePriceOutput,
  buildDefaultGetCandlestickDataInput,
  buildDefaultGetCandlestickDataOutput,
  buildDefaultGetCurrentPriceInput,
  buildDefaultGetCurrentPriceOutput,
  buildDefaultGetOrderBookPriceInput,
  buildDefaultGetOrderBookPriceOutput,
  buildDefaultGetPriceChangeInput,
  buildDefaultGetPriceChangeOutput,
} from '../../builders/market/market-test-builder.js';

const apiInfoProviderMock = mocked(jest.genMockFromModule<ApiInfoProvider>('../../../src/client.js'), true);
const axiosInstanceMock = mocked(axiosInstance, true);

describe('MarketCommand', () => {
  beforeEach(() => {
    apiInfoProviderMock.getApiUrl = jest.fn();

    axiosInstanceMock.get = jest.fn();
  });

  describe('Given a GetCandlestickDataCommand to execute', () => {
    let input: GetCandlestickDataInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetCandlestickDataInput();
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
      let output: GetCandlestickDataCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetCandlestickDataOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetCandlestickDataCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetCandlestickDataCommand(input).execute(apiInfoProviderMock);
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

  describe('Given a GetPriceChangeCommand with symbol to execute', () => {
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

  describe('Given a GetPriceChangeCommand without symbol to execute', () => {
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
      let output: GetPriceChangeCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetPriceChangeOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetPriceChangeCommand().execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetPriceChangeCommand().execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetCurrentPriceCommand with symbol to execute', () => {
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

  describe('Given a GetCurrentPriceCommand without symbol to execute', () => {
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
      let output: GetCurrentPriceCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetCurrentPriceOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetCurrentPriceCommand().execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetCurrentPriceCommand().execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetOrderBookPriceCommand with symbol to execute', () => {
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

  describe('Given a GetOrderBookPriceCommand without symbol to execute', () => {
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
      let output: GetOrderBookPriceCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetOrderBookPriceOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetOrderBookPriceCommand().execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetOrderBookPriceCommand().execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });
});

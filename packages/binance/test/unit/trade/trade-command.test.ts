import { mocked } from 'ts-jest/utils';
import MockDate from 'mockdate';
import { AxiosInstance } from 'axios';
import { getQueryParameters } from '../../../src/common/http.js';
import { sign } from '../../../src/common/signature.js';
import { ApiInfoProvider } from '../../../src/client.js';
import { CommandError } from '../../../src/command.js';
import {
  GetAccountTradesListCommand,
  GetAccountTradesListCommandOutput,
  GetAggregateTradesListCommand,
  GetAggregateTradesListCommandOutput,
  GetOldTradesListCommand,
  GetOldTradesListCommandOutput,
  GetRecentTradesListCommand,
  GetRecentTradesListCommandOutput,
} from '../../../src/trade/trade-command.js';
import { GetAccountTradesListInput, GetAggregateTradesListInput, GetOldTradesListInput, GetRecentTradesListInput } from '../../../src/trade/trade.js';
import { buildDefaultCommandOutput } from '../../builders/common/command-test-builder.js';
import {
  buildDefaultGetAccountTradesListInput,
  buildDefaultGetAccountTradesListOutput,
  buildDefaultGetAggregateTradesListInput,
  buildDefaultGetAggregateTradesListOutput,
  buildDefaultGetOldTradesListInput,
  buildDefaultGetOldTradesListOutput,
  buildDefaultGetRecentTradesListInput,
  buildDefaultGetRecentTradesListOutput,
} from '../../builders/trade/trade-test-builder.js';

const apiInfoProviderMock = mocked(jest.genMockFromModule<ApiInfoProvider>('../../../src/client.js'), true);
const axiosInstanceMock = mocked(jest.genMockFromModule<AxiosInstance>('axios'), true);

describe('TradeCommand', () => {
  let date: Date;

  beforeEach(() => {
    date = new Date();
    MockDate.set(date);

    apiInfoProviderMock.getApiUrl = jest.fn();
    apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    apiInfoProviderMock.getApiKey = jest.fn();
    apiInfoProviderMock.getApiKey.mockResolvedValueOnce('api-key');
    apiInfoProviderMock.getSecretKey = jest.fn();
    apiInfoProviderMock.getSecretKey.mockResolvedValueOnce('secret-key');

    axiosInstanceMock.get = jest.fn();
  });

  describe('Given a GetAccountTradesListCommand to execute', () => {
    let input: GetAccountTradesListInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetAccountTradesListInput();
      queryParameters = getQueryParameters(input, true);
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/myTrades?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
        headers: { 'X-MBX-APIKEY': 'api-key' },
      });
    });

    describe('When success', () => {
      let output: GetAccountTradesListCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetAccountTradesListOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetAccountTradesListCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetAccountTradesListCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetRecentTradesListCommand to execute', () => {
    let input: GetRecentTradesListInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetRecentTradesListInput();
      queryParameters = getQueryParameters(input, false);
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(0);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(0);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/trades?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetRecentTradesListCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetRecentTradesListOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetRecentTradesListCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetRecentTradesListCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetOldTradesListCommand to execute', () => {
    let input: GetOldTradesListInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetOldTradesListInput();
      queryParameters = getQueryParameters(input, false);
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(0);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/historicalTrades?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
        headers: { 'X-MBX-APIKEY': 'api-key' },
      });
    });

    describe('When success', () => {
      let output: GetOldTradesListCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetOldTradesListOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetOldTradesListCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetOldTradesListCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetAggregateTradesListCommand to execute', () => {
    let input: GetAggregateTradesListInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetAggregateTradesListInput();
      queryParameters = getQueryParameters(input, false);
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(0);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(0);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/aggTrades?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetAggregateTradesListCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetAggregateTradesListOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetAggregateTradesListCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetAggregateTradesListCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });
});

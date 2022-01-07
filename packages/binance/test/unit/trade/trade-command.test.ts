import { mocked } from 'ts-jest/utils';
import MockDate from 'mockdate';
import { axiosInstance, getQueryParameters } from '../../../src/common/axios-instance.js';
import { sign } from '../../../src/common/signature.js';
import { SecuredApiInfoProvider } from '../../../src/client.js';
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
import {
  GetAccountTradesListInput,
  GetAccountTradesListOutput,
  GetAggregateTradesListInput,
  GetAggregateTradesListOutput,
  GetOldTradesListInput,
  GetOldTradesListOutput,
  GetRecentTradesListInput,
  GetRecentTradesListOutput,
} from '../../../src/trade/trade.js';
import { buildDefaultCommandOutput } from '../../builders/common/command-test-builder.js';
import { buildDefaultGetAccountTradesListInput, buildDefaultGetAggregateTradesListInput, buildDefaultGetOldTradesListInput, buildDefaultGetRecentTradesListInput } from '../../builders/trade/trade-test-builder.js';

const apiInfoProviderMock = mocked(jest.genMockFromModule<SecuredApiInfoProvider>('../../../src/client.js'), true);
const axiosInstanceMock = mocked(axiosInstance, true);

describe('TradeCommand', () => {
  let date: Date;

  beforeEach(() => {
    date = new Date();
    MockDate.set(date);

    apiInfoProviderMock.getApiUrl = jest.fn();
    apiInfoProviderMock.getApiKey = jest.fn();
    apiInfoProviderMock.getSecretKey = jest.fn();

    axiosInstanceMock.get = jest.fn();
  });

  describe('Given a GetAccountTradesListCommand to execute', () => {
    let input: GetAccountTradesListInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetAccountTradesListInput();
      queryParameters = getQueryParameters(input, true);
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
      apiInfoProviderMock.getApiKey.mockResolvedValueOnce('api-key');
      apiInfoProviderMock.getSecretKey.mockResolvedValueOnce('secret-key');
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
        // FIXME
        output = buildDefaultCommandOutput({} as GetAccountTradesListOutput);

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetAccountTradesListCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetAccountTradesListCommand(input).execute(apiInfoProviderMock);
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

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

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
        // FIXME
        output = buildDefaultCommandOutput({} as GetRecentTradesListOutput);

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetRecentTradesListCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetRecentTradesListCommand(input).execute(apiInfoProviderMock);
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

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/historicalTrades?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetOldTradesListCommandOutput;

      beforeEach(() => {
        // FIXME
        output = buildDefaultCommandOutput({} as GetOldTradesListOutput);

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetOldTradesListCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetOldTradesListCommand(input).execute(apiInfoProviderMock);
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

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

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
        // FIXME
        output = buildDefaultCommandOutput({} as GetAggregateTradesListOutput);

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetAggregateTradesListCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetAggregateTradesListCommand(input).execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });
});

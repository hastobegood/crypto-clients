import { AxiosInstance } from 'axios';

import { ApiInfoProvider } from '../../../src/client.js';
import { CommandError, EmptyCommandOutput } from '../../../src/command.js';
import { getQueryParameters } from '../../../src/common/http.js';
import { GetExchangeInfoCommand, GetExchangeInfoCommandOutput, GetServerTimeCommand, GetServerTimeCommandOutput, TestConnectivityCommand } from '../../../src/general/general-command.js';
import { GetExchangeInfoInput } from '../../../src/general/general.js';
import { buildDefaultCommandOutput, buildEmptyCommandOutput } from '../../builders/common/command-test-builder.js';
import { buildDefaultGetExchangeInfoInput, buildDefaultGetExchangeInfoOutput, buildDefaultGetServerTimeOutput } from '../../builders/general/general-test-builder.js';

const apiInfoProviderMock = jest.mocked(jest.genMockFromModule<ApiInfoProvider>('../../../src/client.js'), true);
const axiosInstanceMock = jest.mocked(jest.genMockFromModule<AxiosInstance>('axios'), true);

describe('GeneralCommand', () => {
  beforeEach(() => {
    apiInfoProviderMock.getApiUrl = jest.fn();
    apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
    apiInfoProviderMock.getApiKey = jest.fn();
    apiInfoProviderMock.getApiKey.mockResolvedValueOnce('api-key');
    apiInfoProviderMock.getSecretKey = jest.fn();
    apiInfoProviderMock.getSecretKey.mockResolvedValueOnce('secret-key');

    axiosInstanceMock.get = jest.fn();
  });

  describe('Given a TestConnectivityCommand to execute', () => {
    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(0);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(0);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual('/v3/ping');
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: EmptyCommandOutput;

      beforeEach(() => {
        output = buildEmptyCommandOutput();

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new TestConnectivityCommand().execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new TestConnectivityCommand().execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetServerTimeCommand to execute', () => {
    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(0);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(0);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual('/v3/time');
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
      });
    });

    describe('When success', () => {
      let output: GetServerTimeCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetServerTimeOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetServerTimeCommand().execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetServerTimeCommand().execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });

  describe('Given a GetExchangeInfoCommand to execute', () => {
    let input: GetExchangeInfoInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultGetExchangeInfoInput();
      queryParameters = getQueryParameters(input, false);
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(0);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(0);

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
        const result = await new GetExchangeInfoCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetExchangeInfoCommand(input).execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });
});

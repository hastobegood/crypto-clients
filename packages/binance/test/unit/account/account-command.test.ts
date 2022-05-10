import { AxiosInstance } from 'axios';
import MockDate from 'mockdate';

import { GetAccountInfoCommand, GetAccountInfoCommandOutput } from '../../../src/account/account-command.js';
import { ApiInfoProvider } from '../../../src/client.js';
import { CommandError } from '../../../src/command.js';
import { getQueryParameters } from '../../../src/common/http.js';
import { sign } from '../../../src/common/signature.js';
import { buildDefaultGetAccountInfoOutput } from '../../builders/account/account-test-builder.js';
import { buildDefaultCommandOutput } from '../../builders/common/command-test-builder.js';

const apiInfoProviderMock = jest.mocked(jest.genMockFromModule<ApiInfoProvider>('../../../src/client.js'), true);
const axiosInstanceMock = jest.mocked(jest.genMockFromModule<AxiosInstance>('axios'), true);

describe('AccountCommand', () => {
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

  describe('Given a GetAccountInfoCommand to execute', () => {
    let queryParameters: string;

    beforeEach(() => {
      queryParameters = `${getQueryParameters({}, true)}`;
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getApiKey).toHaveBeenCalledTimes(1);
      expect(apiInfoProviderMock.getSecretKey).toHaveBeenCalledTimes(1);

      expect(axiosInstanceMock.get).toHaveBeenCalledTimes(1);
      const getParams = axiosInstanceMock.get.mock.calls[0];
      expect(getParams.length).toEqual(2);
      expect(getParams[0]).toEqual(`/v3/account?${queryParameters}`);
      expect(getParams[1]).toEqual({
        baseURL: 'api-url',
        headers: { 'X-MBX-APIKEY': 'api-key' },
      });
    });

    describe('When success', () => {
      let output: GetAccountInfoCommandOutput;

      beforeEach(() => {
        output = buildDefaultCommandOutput(buildDefaultGetAccountInfoOutput());

        axiosInstanceMock.get.mockResolvedValueOnce(output);
      });

      it('Then execution result is returned', async () => {
        const result = await new GetAccountInfoCommand().execute(axiosInstanceMock, apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetAccountInfoCommand().execute(axiosInstanceMock, apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });
});

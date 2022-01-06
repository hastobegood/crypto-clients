import { mocked } from 'ts-jest/utils';
import MockDate from 'mockdate';
import { axiosInstance, getQueryParameters } from '../../../src/common/axios-instance.js';
import { sign } from '../../../src/common/signature.js';
import { SecuredApiInfoProvider } from '../../../src/client.js';
import { CommandError } from '../../../src/command.js';
import { GetAccountInfoCommand, GetAccountInfoCommandInput, GetAccountInfoCommandOutput } from '../../../src/account/account-command.js';
import { buildDefaultCommandInput, buildDefaultCommandOutput } from '../../builders/common/command-test-builder.js';
import { buildDefaultGetAccountInfoInput, buildDefaultGetAccountInfoOutput } from '../../builders/account/account-test-builder.js';

const apiInfoProviderMock = mocked(jest.genMockFromModule<SecuredApiInfoProvider>('../../../src/client.js'), true);
const axiosInstanceMock = mocked(axiosInstance, true);

describe('ExchangeCommand', () => {
  let date: Date;

  beforeEach(() => {
    date = new Date();
    MockDate.set(date);

    apiInfoProviderMock.getApiUrl = jest.fn();
    apiInfoProviderMock.getApiKey = jest.fn();
    apiInfoProviderMock.getSecretKey = jest.fn();

    axiosInstanceMock.get = jest.fn();
  });

  describe('Given a GetAccountInfoCommand to execute', () => {
    let input: GetAccountInfoCommandInput;
    let queryParameters: string;

    beforeEach(() => {
      input = buildDefaultCommandInput(buildDefaultGetAccountInfoInput());
      queryParameters = `${getQueryParameters(input.data, true)}`;
      queryParameters = `${queryParameters}&${sign(queryParameters, 'secret-key')}`;

      apiInfoProviderMock.getApiUrl.mockResolvedValueOnce('api-url');
      apiInfoProviderMock.getApiKey.mockResolvedValueOnce('api-key');
      apiInfoProviderMock.getSecretKey.mockResolvedValueOnce('secret-key');
    });

    afterEach(() => {
      expect(apiInfoProviderMock.getApiUrl).toHaveBeenCalledTimes(1);

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
        const result = await new GetAccountInfoCommand(input).execute(apiInfoProviderMock);
        expect(result).toEqual(output);
      });
    });

    describe('When error', () => {
      beforeEach(() => {
        axiosInstanceMock.get.mockRejectedValueOnce(new Error('Error!'));
      });

      it('Then error is thrown', async () => {
        try {
          await new GetAccountInfoCommand(input).execute(apiInfoProviderMock);
          fail();
        } catch (error) {
          expect(error).toBeDefined();
          expect((error as CommandError).message).toEqual('Unable to execute command: Error: Error!');
        }
      });
    });
  });
});

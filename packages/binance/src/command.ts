import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { ApiInfoProvider } from './client.js';

export type EmptyCommandOutput = Omit<CommandOutput<never>, 'data'>;

export interface CommandOutput<D> {
  status: number;
  headers: Record<string, string>;
  data: D;
}

export abstract class Command<O> {
  abstract execute(axiosInstance: AxiosInstance, apiInfoProvider: ApiInfoProvider): Promise<O>;

  protected async handle<D>(request: () => Promise<AxiosResponse<D>>): Promise<CommandOutput<D>> {
    try {
      const response = await request();
      return {
        status: response.status,
        headers: response.headers,
        data: response.data,
      };
    } catch (error) {
      throw new CommandError(error);
    }
  }
}

export class CommandError extends Error {
  private output?: CommandOutput<{ code: number; msg: string }>;

  constructor(cause: unknown) {
    super(`Unable to execute command: ${cause}`);

    if (cause instanceof AxiosError && cause.response) {
      this.output = {
        status: cause.response.status,
        headers: cause.response.headers,
        data: cause.response.data,
      };
      this.message = this.message.concat(` (${JSON.stringify(this.output?.data)})`);
    }
  }
}

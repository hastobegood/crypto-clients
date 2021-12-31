import { AxiosResponse } from 'axios';
import { isAxiosError } from './axios-instance.js';
import { ApiInfoProvider } from '../api/api-info-provider.js';

export interface CommandInput<D> {
  data: D;
}

export interface CommandOutput<D> {
  status: number;
  headers: Record<string, string>;
  data: D;
}

export abstract class Command<I, O> {
  protected abstract readonly input: I;

  abstract execute(apiInfoProvider: ApiInfoProvider): Promise<O>;

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

  constructor(private cause: unknown) {
    super(`Unable to execute command: ${cause}`);

    if (isAxiosError(cause) && cause.response) {
      this.output = {
        status: cause.response.status,
        headers: cause.response.headers,
        data: cause.response.data,
      };
    }
  }
}

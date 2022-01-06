import { randomNumber } from '../random-test-builder.js';
import { ApiInfoProvider } from '../../../src/client.js';
import { Command, CommandOutput } from '../../../src/command.js';

export const buildEmptyCommandOutput = (): Omit<CommandOutput<never>, 'data'> => {
  return {
    status: 200,
    headers: {
      time: new Date().valueOf().toString(),
      limit: randomNumber(1, 1_000_000).toString(),
    },
  };
};

export const buildDefaultCommandOutput = <D>(data: D): CommandOutput<D> => {
  return {
    status: 200,
    headers: {
      time: new Date().valueOf().toString(),
      limit: randomNumber(1, 1_000_000).toString(),
    },
    data: data,
  };
};

export const buildDefaultTestCommand = () => {
  return new TestCommand();
};

class TestCommand extends Command<string> {
  async execute(apiInfoProvider: ApiInfoProvider): Promise<string> {
    return 'output';
  }
}

import { randomNumber, randomString } from '../random-test-builder.js';
import { ApiInfoProvider } from '../../../src/api/api-info-provider.js';
import { Command, CommandInput, CommandOutput } from '../../../src/common/command.js';

export const buildDefaultCommandInput = <D>(data: D): CommandInput<D> => {
  return {
    data: data,
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
  return new TestCommand(randomString());
};

class TestCommand extends Command<string, string> {
  constructor(readonly input: string) {
    super();
  }

  async execute(apiInfoProvider: ApiInfoProvider): Promise<string> {
    return 'output';
  }
}

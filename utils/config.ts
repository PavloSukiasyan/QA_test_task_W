import { fileExist, readFile } from './utils';

export type TestConfig = {
  config: {
    url: string;
  };
};

const CONFIG_LOCAL_FILE_PATH = './config.local.json';

function loadConfig(): TestConfig {
  const configFile = CONFIG_LOCAL_FILE_PATH;

  if (fileExist(configFile)) {
    return JSON.parse(readFile(configFile)) as TestConfig;
  }

  throw new Error(`Config file ${configFile} not found`);
}

export function getConfig(): TestConfig {
  const config = loadConfig();
  return config;
}

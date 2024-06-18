import { readFile } from 'fs/promises';
import { Test } from '../model/TestModel';
import path from 'node:path';
import { ILogObj, Logger } from 'tslog';

const logger: Logger<ILogObj> = new Logger({ name: 'FileConfig', type: 'pretty' });

type JsonFile = { tests: Test[] };
export let jsonFile: JsonFile = { tests: [] };

export async function loadConfig() {
  try {
    const absolutePath = path.resolve(__dirname, './config.json');
    jsonFile = JSON.parse(await readFile(absolutePath, 'utf8'));
  } catch (error) {
    logger.error('Failed to load configuration:', error.message);
  }
}

export function getConfig() {
  return jsonFile;
}

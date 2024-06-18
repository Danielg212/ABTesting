import { readFile } from 'fs/promises';
import path from 'node:path';
import { ILogObj, Logger } from 'tslog';
import { Test } from '../model/TestModel';
import jsonConfig from './config.json';

const logger: Logger<ILogObj> = new Logger({ name: 'FileConfig', type: 'pretty' });

let jsonFile: any = { tests: [] };

export function loadConfig() {
  try {
    jsonFile = jsonConfig;
  } catch (error) {
    logger.error('Failed to load configuration:', error.message);
  }
}

export function getConfig() {
  return jsonFile;
}

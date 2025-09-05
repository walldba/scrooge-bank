import type { Config } from 'jest';
import baseConfig from './jest.config';

const config: Config = {
  ...baseConfig,
  rootDir: './test',
  testRegex: '.e2e-spec.ts$',
};

export default config;

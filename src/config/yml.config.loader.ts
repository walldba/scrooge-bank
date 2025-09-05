import { plainToInstance } from 'class-transformer';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { ConfigDto } from './dto/config.dto';
import { validateSync } from 'class-validator';

export namespace YmlConfig {
  export function load() {
    const environment = process.env.NODE_ENV || 'development';
    const isProduction = environment === 'production';
    const path = isProduction ? 'dist/config' : 'src/config';

    const ymlConfig = yaml.load(
      readFileSync(join(process.cwd(), path, `${environment}.yml`), 'utf8')
    ) as Record<string, any>;

    return validate(ymlConfig);
  }

  function validate(config: Record<string, unknown>): ConfigDto {
    const validatedConfig = plainToInstance(ConfigDto, config, {
      enableImplicitConversion: true,
    });

    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validatedConfig;
  }
}

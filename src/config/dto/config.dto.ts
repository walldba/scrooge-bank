import { ValidateNested } from 'class-validator';
import { AppConfigDto } from './app.config.dto';

export class ConfigDto {
  @ValidateNested({ each: true })
  app: AppConfigDto;
}

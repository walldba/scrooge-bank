import { IsNumber, IsString } from 'class-validator';

export class AppConfigDto {
  @IsNumber()
  port: number;

  @IsString()
  env: string;
}

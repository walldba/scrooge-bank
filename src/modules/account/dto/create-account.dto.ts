import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Type } from 'class-transformer';

export class CreateAccountDto {
  @IsString()
  @IsOptional()
  accountNumber: string;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}

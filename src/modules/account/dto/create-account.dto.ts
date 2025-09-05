import { IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Type } from 'class-transformer';

export class CreateAccountDto {
  @IsString()
  accountNumber: string;

  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}

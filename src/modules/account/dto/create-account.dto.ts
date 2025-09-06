import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAccountDto {
  @ApiProperty({
    description: 'Account number',
    example: '1234567890',
  })
  @IsString()
  accountNumber: string;

  @ApiProperty({
    description: 'User details associated with the account',
    type: () => CreateUserDto,
  })
  @ValidateNested()
  @Type(() => CreateUserDto)
  user: CreateUserDto;
}

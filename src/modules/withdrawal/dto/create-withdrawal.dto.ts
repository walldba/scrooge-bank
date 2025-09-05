import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateWithdrawalDto {
  @ApiProperty({
    description: 'The email of the user making the withdrawal',
    example: 'user@example.com',
  })
  @IsEmail()
  userMail: string;

  @ApiProperty({
    description: 'The account number of the user making the withdrawal.',
    example: '12345678900',
  })
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty({
    description:
      'The amount to withdrawal in cents. Must be a positive integer.',
    example: 10000,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
}

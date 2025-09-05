import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class PayLoanDto {
  @ApiProperty({
    description: 'The email of the user paying the loan.',
    example: 'user@example.com',
  })
  @IsEmail()
  userMail: string;

  @ApiProperty({
    description: 'The account number of the user paying the loan.',
    example: '12345678900',
  })
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty({
    description:
      'The amount to pay towards the loan principal in cents. Must be a positive integer.',
    example: 100000,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
}

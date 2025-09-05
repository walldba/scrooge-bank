import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({
    description: 'The email of the user requesting the loan.',
    example: 'user@example.com',
  })
  @IsEmail()
  userMail: string;

  @ApiProperty({
    description: 'The account number of the user requesting the loan.',
    example: '12345678900',
  })
  @IsNotEmpty()
  @IsString()
  accountNumber: string;

  @ApiProperty({
    description:
      'Amount of the loan requested in cents. Must be a positive integer.',
    example: 5000000,
    minimum: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;
}

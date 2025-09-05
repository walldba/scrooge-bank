import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsUUID, Min, NotEquals } from 'class-validator';

export class ExecuteTransferDto {
  @ApiProperty({
    description: 'The ID of the source account for the transfer.',
    example: 'a1b2c3d4-e5f6-7890-1234-567890abcdef',
  })
  @IsUUID()
  sourceAccountId: string;

  @ApiProperty({
    description: 'The ID of the destination account for the transfer.',
    example: 'fedcba98-7654-3210-fedc-ba9876543210',
  })
  @IsUUID()
  @NotEquals('sourceAccountId', {
    message: 'Source and destination accounts cannot be the same.',
  })
  destinationAccountId: string;

  @ApiProperty({
    description: 'The amount to transfer in cents. Must be a positive integer.',
    example: 500000, // 5,000 USD
    minimum: 1,
  })
  @IsNumber()
  @Min(1)
  amount: number;
}

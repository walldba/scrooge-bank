import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { IDepositCreatedResponse } from './interfaces/deposit-response.interface';

@ApiTags('Deposit')
@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new deposit' })
  @ApiResponse({
    status: 201,
    description: 'Deposit created successfully.',
  })
  async createDeposit(
    @Body() createDepositDto: CreateDepositDto
  ): Promise<IDepositCreatedResponse> {
    return this.depositService.validateAndCreate(createDepositDto);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { WithdrawalService } from './withdrawal.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { IWithdrawalCreatedResponse } from './interfaces/withdrawal-response.interface';

@ApiTags('Withdrawal')
@Controller('withdrawal')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @Post('create')
  @ApiOperation({ summary: 'Create a new withdrawal' })
  @ApiResponse({
    status: 201,
    description: 'Withdrawal created successfully.',
  })
  async createWithdrawal(
    @Body() createWithdrawalDto: CreateWithdrawalDto
  ): Promise<IWithdrawalCreatedResponse> {
    return this.withdrawalService.validateAndCreate(createWithdrawalDto);
  }
}

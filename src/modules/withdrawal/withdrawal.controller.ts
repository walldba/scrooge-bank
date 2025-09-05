import { Body, Controller, Post } from '@nestjs/common';
import { WithdrawalService } from './withdrawal.service';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { IWithdrawalCreatedResponse } from './interfaces/withdrawal-response.interface';

@Controller('withdrawal')
export class WithdrawalController {
  constructor(private readonly withdrawalService: WithdrawalService) {}

  @Post('create')
  async createWithdrawal(
    @Body() createWithdrawalDto: CreateWithdrawalDto
  ): Promise<IWithdrawalCreatedResponse> {
    return this.withdrawalService.validateAndCreate(createWithdrawalDto);
  }
}

import { Body, Controller, Post } from '@nestjs/common';
import { DepositService } from './deposit.service';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { IDepositCreatedResponse } from './interfaces/deposit-response.interface';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Post('create')
  async createDeposit(
    @Body() createDepositDto: CreateDepositDto
  ): Promise<IDepositCreatedResponse> {
    return this.depositService.validateAndCreate(createDepositDto);
  }
}

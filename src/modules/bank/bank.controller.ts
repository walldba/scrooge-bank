import { Controller, Get } from '@nestjs/common';
import { BankService } from './bank.service';
import { IBankAvailableFundsResponse } from './interfaces/bank-response.interface';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get('available-funds')
  async getAvailableFunds(): Promise<IBankAvailableFundsResponse> {
    return this.bankService.getAvailableFunds();
  }
}

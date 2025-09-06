import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BankService } from './bank.service';
import { IBankAvailableFundsResponse } from './interfaces/bank-response.interface';

@ApiTags('Bank')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get('available-funds')
  @ApiOperation({ summary: 'Get available funds in the bank' })
  @ApiResponse({
    status: 200,
    description: 'Returns available, initial, loaned, and deposit funds.',
  })
  async getAvailableFunds(): Promise<IBankAvailableFundsResponse> {
    return this.bankService.getAvailableFunds();
  }
}

import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { LoanService } from './loan.service';
import { ILoanCreatedResponse } from './interfaces/loan-response.interface';
import { CreateLoanDto } from './dto/create-loan.dto';
import { PayLoanDto } from './dto/pay-loan';

@Controller('loan')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('create')
  async createLoanRequest(
    @Body() createLoanDto: CreateLoanDto
  ): Promise<ILoanCreatedResponse> {
    return this.loanService.validateAndCreate(createLoanDto);
  }

  @Post('pay/:id')
  async payLoan(
    @Param('id') id: string,
    @Body() payLoanDto: PayLoanDto
  ): Promise<ILoanCreatedResponse> {
    return this.loanService.validateAndPay(id, payLoanDto);
  }
}

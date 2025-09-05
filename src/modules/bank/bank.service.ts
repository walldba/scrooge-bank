import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { BankRepository } from './entities/bank.repository';
import { MoneyUtils } from '../../common/utils/money.utils';
import { BankResponseMappers } from './mappers/bank-response.mapper';
import { IBankAvailableFundsResponse } from './interfaces/bank-response.interface';

@Injectable()
export class BankService implements OnModuleInit {
  //Suggestion: Create settings table to manage these values
  private readonly INITIAL_BANK_CAPITAL_USD_AMOUNT = 250000;
  private readonly CUSTOMER_DEPOSIT_LOAN_PERCENTAGE = 0.25;

  constructor(
    @Inject()
    private readonly bankRepository: BankRepository
  ) {}

  async onModuleInit() {
    const initialAmountCents = MoneyUtils.toCents(
      this.INITIAL_BANK_CAPITAL_USD_AMOUNT
    );

    const existingBank = await this.bankRepository.findOneBy({});

    if (!existingBank) {
      const bank = this.bankRepository.create({
        availableFunds: initialAmountCents,
        initialFunds: initialAmountCents,
        loanedFunds: 0,
        depositFunds: 0,
      });

      await this.bankRepository.save(bank);

      console.log(
        `Bank entity initialized with ${this.INITIAL_BANK_CAPITAL_USD_AMOUNT} USD initial capital.`
      );
    }
  }

  async getAvailableFunds(): Promise<IBankAvailableFundsResponse> {
    const bank = await this.bankRepository.findOneBy({});

    return BankResponseMappers.mapAvailableFundsResponse(bank);
  }
}

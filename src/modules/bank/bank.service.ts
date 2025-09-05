import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { BankRepository } from './entities/bank.repository';
import { MoneyUtils } from '../../common/utils/money.utils';
import { BankResponseMappers } from './mappers/bank-response.mapper';
import { IBankAvailableFundsResponse } from './interfaces/bank-response.interface';
import { UpdateResult } from 'typeorm';

@Injectable()
export class BankService implements OnModuleInit {
  private readonly INITIAL_BANK_CAPITAL_USD_AMOUNT = 250000;
  private readonly CUSTOMER_DEPOSIT_LOAN_PERCENTAGE = 0.25;

  constructor(
    @Inject()
    private readonly bankRepository: BankRepository
  ) {}

  async onModuleInit(): Promise<void> {
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

  private async getBank() {
    const bank = await this.bankRepository.findOneBy({});

    if (!bank) {
      throw new Error('Bank entity not found.');
    }
    return bank;
  }

  async getRemainingLoanCapacity(): Promise<number> {
    const bank = await this.getBank();

    const initialFundsNum = Number(bank.initialFunds);
    const depositFundsNum = Number(bank.depositFunds);
    const loanedFundsNum = Number(bank.loanedFunds);

    const maximumLoanCapacity =
      initialFundsNum +
      Math.floor(depositFundsNum * this.CUSTOMER_DEPOSIT_LOAN_PERCENTAGE);

    const remainingCapacity = maximumLoanCapacity - loanedFundsNum;

    return Math.max(0, remainingCapacity);
  }

  async handleDeposit(amount: number): Promise<UpdateResult> {
    const bank = await this.getBank();

    return this.bankRepository.update(
      { id: bank.id },
      {
        availableFunds: () => `"availableFunds" + ${amount}`,
        depositFunds: () => `"depositFunds" + ${amount}`,
      }
    );
  }

  async handleWithdrawal(amount: number): Promise<UpdateResult> {
    const bank = await this.getBank();

    return this.bankRepository.update(
      { id: bank.id },
      {
        availableFunds: () => `"availableFunds" - ${amount}`,
        depositFunds: () => `"depositFunds" - ${amount}`,
      }
    );
  }

  async handleLoanRequest(amount: number): Promise<UpdateResult> {
    const bank = await this.getBank();

    return this.bankRepository.update(
      { id: bank.id },
      {
        availableFunds: () => `"availableFunds" - ${amount}`,
        loanedFunds: () => `"loanedFunds" + ${amount}`,
      }
    );
  }

  async handleLoanPayment(amount: number): Promise<UpdateResult> {
    const bank = await this.getBank();

    return this.bankRepository.update(
      { id: bank.id },
      {
        availableFunds: () => `"availableFunds" + ${amount}`,
        loanedFunds: () => `"loanedFunds" - ${amount}`,
      }
    );
  }
}

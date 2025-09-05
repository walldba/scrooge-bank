import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { LoanRepository } from './entities/loan.repository';
import { CreateLoanDto } from './dto/create-loan.dto';
import { AccountService } from '../account/account.service';
import { BankService } from '../bank/bank.service';
import { LoanStatusEnum } from './enum/loan-status.enum';
import { AccountEntity } from '../account/entities/account.entity';
import { LoanResponseMapper } from './mappers/loan-response.mapper';
import { PayLoanDto } from './dto/pay-loan';
import { AccountStatusEnum } from '../account/enums/account-status.enum';
import { MoneyUtils } from '../../common/utils/money.utils';
import { LoanEntity } from './entities/loan.entity';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class LoanService {
  constructor(
    @Inject()
    private readonly loanRepository: LoanRepository,
    @Inject()
    private readonly accountService: AccountService,
    @Inject()
    private readonly bankService: BankService
  ) {}

  @Transactional()
  async validateAndCreate(createLoanDto: CreateLoanDto): Promise<any> {
    const { accountNumber, userMail, amount } = createLoanDto;

    const account = await this.accountService.validateAccountOperation(
      accountNumber,
      userMail
    );

    const loanCapacity = await this.bankService.getRemainingLoanCapacity();

    if (amount > loanCapacity) {
      throw new BadRequestException(
        `Loan amount exceeds bank's available loan capacity.`
      );
    }

    const [loan] = await Promise.all([
      this.createLoan(amount, loanCapacity, account),
      this.accountService.incrementAccountBalance(account, amount),
      this.bankService.handleLoanRequest(amount),
    ]);

    return LoanResponseMapper.mapLoanResponse(loan);
  }

  private async createLoan(
    amount: number,
    loanCapacity: number,
    account: AccountEntity
  ) {
    const canCreateLoan = amount <= loanCapacity;

    const newLoan = this.loanRepository.create({
      amount,
      paidAmount: 0,
      status: canCreateLoan ? LoanStatusEnum.APPROVED : LoanStatusEnum.REJECTED,
      account,
    });

    return this.loanRepository.save(newLoan);
  }

  @Transactional()
  async validateAndPay(loanId: string, payLoanDto: PayLoanDto): Promise<any> {
    const { accountNumber, amount, userMail } = payLoanDto;

    const account = await this.accountService.validateAccountOperation(
      accountNumber,
      userMail
    );

    const loan = await this.loanRepository.findOne({
      where: { id: loanId, account: { id: account.id } },
      relations: ['account'],
    });

    this.validateLoan(loan, amount);

    const paidLoan = await this.payLoan(loan, amount);

    return LoanResponseMapper.mapLoanResponse(paidLoan);
  }

  private async payLoan(loan: LoanEntity, amount: number): Promise<LoanEntity> {
    const [updatedLoan] = await Promise.all([
      this.loanRepository.updateLoan(loan, amount),
      this.accountService.decrementAccountBalance(loan.account, amount),
      this.bankService.handleLoanPayment(amount),
    ]);

    return updatedLoan;
  }

  private validateLoan(loan: LoanEntity, amount: number): void {
    if (!loan.account || loan.account.status !== AccountStatusEnum.OPEN) {
      throw new BadRequestException(
        `Associated account for loan ${loan.id} is not open or does not exist.`
      );
    }

    if (loan.status === LoanStatusEnum.PAID) {
      throw new BadRequestException(`Loan ${loan.id} is already fully paid.`);
    }

    const remainingAmount = loan.amount - loan.paidAmount;
    const remainingAmountFormatted = MoneyUtils.format(remainingAmount);

    if (amount > remainingAmount) {
      throw new BadRequestException(
        `Payment amount exceeds the remaining amount due (${remainingAmountFormatted} USD) for loan ${loan.id}.`
      );
    }
  }
}

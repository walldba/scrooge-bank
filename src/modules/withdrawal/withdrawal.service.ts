import { Inject, Injectable } from '@nestjs/common';
import { WithdrawalRepository } from './entities/withdrawal.repository';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { AccountService } from '../account/account.service';
import { BankService } from '../bank/bank.service';
import { Transactional } from 'typeorm-transactional';
import { AccountEntity } from '../account/entities/account.entity';

@Injectable()
export class WithdrawalService {
  constructor(
    @Inject()
    private readonly accountService: AccountService,
    @Inject()
    private readonly bankService: BankService,
    @Inject()
    private readonly depositRepository: WithdrawalRepository
  ) {}

  @Transactional()
  async validateAndCreate(createDepositDto: CreateWithdrawalDto): Promise<any> {
    const { accountNumber, amount, userMail } = createDepositDto;

    const validatedAccount = await this.accountService.validateAccountOperation(
      accountNumber,
      userMail
    );

    await Promise.all([
      this.accountService.decrementAccountBalance(validatedAccount, amount),
      this.bankService.handleWithdrawal(amount),
    ]);

    return this.createWithdrawal(validatedAccount, amount);
  }

  private createWithdrawal(account: AccountEntity, amount: number) {
    const deposit = this.depositRepository.create({
      amount,
      account: account,
    });

    return this.depositRepository.save(deposit);
  }
}

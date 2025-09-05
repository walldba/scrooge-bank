import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { DepositRepository } from './entities/deposit.repository';
import { CreateDepositDto } from './dto/create-deposit.dto';
import { AccountService } from '../account/account.service';
import { BankService } from '../bank/bank.service';
import { Transactional } from 'typeorm-transactional';
import { AccountStatusEnum } from '../account/enums/account-status.enum';
import { AccountEntity } from '../account/entities/account.entity';

@Injectable()
export class DepositService {
  constructor(
    @Inject()
    private readonly accountService: AccountService,
    @Inject()
    private readonly bankService: BankService,
    @Inject()
    private readonly depositRepository: DepositRepository
  ) {}

  @Transactional()
  async validateAndCreate(createDepositDto: CreateDepositDto): Promise<any> {
    const { accountNumber, amount, userMail } = createDepositDto;

    const validatedAccount = await this.accountService.validateAccountOperation(
      accountNumber,
      userMail
    );

    await Promise.all([
      this.accountService.incrementAccountBalance(validatedAccount, amount),
      this.bankService.handleDeposit(amount),
    ]);

    return this.createDeposit(validatedAccount, amount);
  }

  private createDeposit(account: AccountEntity, amount: number) {
    const deposit = this.depositRepository.create({
      amount,
      account: account,
    });

    return this.depositRepository.save(deposit);
  }
}

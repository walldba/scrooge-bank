import { Inject, Injectable } from '@nestjs/common';
import { WithdrawalRepository } from './entities/withdrawal.repository';
import { CreateWithdrawalDto } from './dto/create-withdrawal.dto';
import { AccountService } from '../account/account.service';
import { BankService } from '../bank/bank.service';
import { Transactional } from 'typeorm-transactional';
import { AccountEntity } from '../account/entities/account.entity';
import { IWithdrawalCreatedResponse } from './interfaces/withdrawal-response.interface';
import { WithdrawalResponseMapper } from './mappers/withdrawal-response.mapper';

@Injectable()
export class WithdrawalService {
  constructor(
    @Inject()
    private readonly accountService: AccountService,
    @Inject()
    private readonly bankService: BankService,
    @Inject()
    private readonly withdrawalRepository: WithdrawalRepository
  ) {}

  @Transactional()
  async validateAndCreate(
    createWithdrawalDto: CreateWithdrawalDto
  ): Promise<IWithdrawalCreatedResponse> {
    const { accountNumber, amount, userMail } = createWithdrawalDto;

    const validatedAccount = await this.accountService.validateAccountOperation(
      accountNumber,
      userMail
    );

    const [withdrawal] = await Promise.all([
      this.createWithdrawal(validatedAccount, amount),
      this.accountService.decrementAccountBalance(validatedAccount, amount),
      this.bankService.handleWithdrawal(amount),
    ]);

    return WithdrawalResponseMapper.mapWithdrawalCreatedResponse(withdrawal);
  }

  private createWithdrawal(account: AccountEntity, amount: number) {
    const withdrawal = this.withdrawalRepository.create({
      amount,
      account: account,
    });

    return this.withdrawalRepository.save(withdrawal);
  }
}

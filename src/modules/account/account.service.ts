import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AccountRepository } from './entities/account.repository';
import { UserService } from '../user/user.service';
import { AccountEntity } from './entities/account.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountStatusEnum } from './enums/account-status.enum';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class AccountService {
  constructor(
    @Inject()
    private readonly accountRepository: AccountRepository,
    @Inject()
    private readonly userService: UserService
  ) {}

  async getAccounts(): Promise<AccountEntity[]> {
    return this.accountRepository.find({ relations: ['user'] });
  }

  getAccountById(id: string): Promise<AccountEntity> {
    return this.accountRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  @Transactional()
  async validateAndCreate(
    createAccountDto: CreateAccountDto
  ): Promise<AccountEntity> {
    const user = await this.userService.findOneOrCreate(createAccountDto.user);

    await this.validateAccountCreation(user.id);

    return this.createAccount(createAccountDto, user.id);
  }

  private async validateAccountCreation(userId: string) {
    const existingAccount = await this.accountRepository.findOneBy({
      user: { id: userId },
      status: AccountStatusEnum.OPEN,
    });

    if (existingAccount) {
      throw new ConflictException(
        `Account with account number ${existingAccount.accountNumber} already exists with status OPEN for this user.`
      );
    }
  }

  private createAccount(createAccountDto: CreateAccountDto, userId: string) {
    const account = this.accountRepository.create({
      user: { id: userId },
      balance: 0,
      accountNumber: createAccountDto.accountNumber,
      status: AccountStatusEnum.OPEN,
    });

    return this.accountRepository.save(account);
  }

  async closeAccount(id: string): Promise<AccountEntity> {
    const account = await this.accountRepository.findOneBy({ id });

    if (!account) {
      throw new ConflictException(`Account with id ${id} not found.`);
    }

    if (account.status === AccountStatusEnum.CLOSED) {
      throw new BadRequestException(
        `Account with ID ${account.id} is already closed.`
      );
    }

    await this.accountRepository.update(id, {
      status: AccountStatusEnum.CLOSED,
      closedAt: new Date(),
    });

    return account;
  }
}

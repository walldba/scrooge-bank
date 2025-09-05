import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AccountEntity } from './account.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AccountRepository extends Repository<AccountEntity> {
  constructor(
    @InjectRepository(AccountEntity)
    private accountRepository: Repository<AccountEntity>
  ) {
    super(
      accountRepository.target,
      accountRepository.manager,
      accountRepository.queryRunner
    );
  }
}

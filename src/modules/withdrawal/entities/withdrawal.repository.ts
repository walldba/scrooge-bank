import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { WithdrawalEntity } from './withdrawal.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WithdrawalRepository extends Repository<WithdrawalEntity> {
  constructor(
    @InjectRepository(WithdrawalEntity)
    private withdrawalRepository: Repository<WithdrawalEntity>
  ) {
    super(
      withdrawalRepository.target,
      withdrawalRepository.manager,
      withdrawalRepository.queryRunner
    );
  }
}

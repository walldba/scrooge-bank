import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DepositEntity } from './deposit.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DepositRepository extends Repository<DepositEntity> {
  constructor(
    @InjectRepository(DepositEntity)
    private depositRepository: Repository<DepositEntity>
  ) {
    super(
      depositRepository.target,
      depositRepository.manager,
      depositRepository.queryRunner
    );
  }
}

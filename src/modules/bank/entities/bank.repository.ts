import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BankEntity } from './bank.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BankRepository extends Repository<BankEntity> {
  constructor(
    @InjectRepository(BankEntity)
    private bankRepository: Repository<BankEntity>
  ) {
    super(
      bankRepository.target,
      bankRepository.manager,
      bankRepository.queryRunner
    );
  }
}

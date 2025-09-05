import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TransferEntity } from './transfer.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TransferRepository extends Repository<TransferEntity> {
  constructor(
    @InjectRepository(TransferEntity)
    private withdrawalRepository: Repository<TransferEntity>
  ) {
    super(
      withdrawalRepository.target,
      withdrawalRepository.manager,
      withdrawalRepository.queryRunner
    );
  }
}

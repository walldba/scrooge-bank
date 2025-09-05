import { Module } from '@nestjs/common';
import { DepositEntity } from './entities/deposit.entity';
import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositRepository } from './entities/deposit.repository';
import { AccountModule } from '../account/account.module';
import { BankModule } from '../bank/bank.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DepositEntity]),
    AccountModule,
    BankModule,
  ],
  providers: [DepositService, DepositRepository],
  controllers: [DepositController],
  exports: [DepositService, DepositRepository],
})
export class DepositModule {}

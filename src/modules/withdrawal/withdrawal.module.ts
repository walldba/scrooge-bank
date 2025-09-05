import { Module } from '@nestjs/common';
import { WithdrawalEntity } from './entities/withdrawal.entity';
import { WithdrawalService } from './withdrawal.service';
import { WithdrawalController } from './withdrawal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithdrawalRepository } from './entities/withdrawal.repository';
import { AccountModule } from '../account/account.module';
import { BankModule } from '../bank/bank.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WithdrawalEntity]),
    AccountModule,
    BankModule,
  ],
  providers: [WithdrawalService, WithdrawalRepository],
  controllers: [WithdrawalController],
  exports: [WithdrawalService, WithdrawalRepository],
})
export class WithdrawalModule {}

import { Module } from '@nestjs/common';
import { LoanEntity } from './entities/loan.entity';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanRepository } from './entities/loan.repository';
import { AccountModule } from '../account/account.module';
import { BankModule } from '../bank/bank.module';

@Module({
  imports: [TypeOrmModule.forFeature([LoanEntity]), AccountModule, BankModule],
  providers: [LoanService, LoanRepository],
  controllers: [LoanController],
  exports: [LoanService, LoanRepository],
})
export class LoanModule {}

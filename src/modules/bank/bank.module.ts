import { Module } from '@nestjs/common';
import { BankEntity } from './entities/bank.entity';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankRepository } from './entities/bank.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BankEntity])],
  providers: [BankService, BankRepository],
  controllers: [BankController],
  exports: [BankService, BankRepository],
})
export class BankModule {}

import { Module } from '@nestjs/common';
import { TransferEntity } from './entities/transfer.entity';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferRepository } from './entities/transfer.repository';
import { AccountModule } from '../account/account.module';

@Module({
  imports: [TypeOrmModule.forFeature([TransferEntity]), AccountModule],
  providers: [TransferService, TransferRepository],
  controllers: [TransferController],
  exports: [TransferService, TransferRepository],
})
export class TransferModule {}

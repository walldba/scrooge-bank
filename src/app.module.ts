import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './config/database.config';
import { YmlConfig } from './config/yml.config.loader';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { BankModule } from './modules/bank/bank.module';
import { UserModule } from './modules/user/user.module';
import { AccountModule } from './modules/account/account.module';
import { DepositModule } from './modules/deposit/deposit.module';
import { WithdrawalModule } from './modules/withdrawal/withdrawal.module';
import { LoanModule } from './modules/loan/loan.module';
import { TransferModule } from './modules/transfer/transfer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [YmlConfig.load],
    }),
    TypeOrmModule.forRootAsync({
      dataSourceFactory: async () => {
        if (!AppDataSource.isInitialized) {
          await AppDataSource.initialize();
        }
        return addTransactionalDataSource(AppDataSource);
      },
      useFactory: () => ({}),
    }),
    BankModule,
    UserModule,
    AccountModule,
    DepositModule,
    WithdrawalModule,
    LoanModule,
    TransferModule,
  ],
})
export class AppModule {}

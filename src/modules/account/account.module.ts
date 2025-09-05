import { Module } from '@nestjs/common';
import { AccountEntity } from './entities/account.entity';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './entities/account.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity]), UserModule],
  providers: [AccountService, AccountRepository],
  controllers: [AccountController],
  exports: [AccountService, AccountRepository],
})
export class AccountModule {}

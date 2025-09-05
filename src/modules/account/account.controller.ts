import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountEntity } from './entities/account.entity';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getAccounts() {
    return this.accountService.getAccounts();
  }

  @Get(':id')
  async getAccountById(@Param('id') id: string): Promise<AccountEntity> {
    return this.accountService.getAccountById(id);
  }

  @Post('create')
  async createAccount(
    @Body() createAccountDto: CreateAccountDto
  ): Promise<AccountEntity> {
    return this.accountService.validateAndCreate(createAccountDto);
  }

  @Post('close/:id')
  async closeAccount(@Param('id') id: string): Promise<AccountEntity> {
    return this.accountService.closeAccount(id);
  }
}

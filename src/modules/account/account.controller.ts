import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { AccountEntity } from './entities/account.entity';
import { IAccountListResponse } from './interfaces/account-response.interface';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async getAccounts(): Promise<IAccountListResponse[]> {
    return this.accountService.getAccounts();
  }

  @Post('create')
  async createAccount(
    @Body() createAccountDto: CreateAccountDto
  ): Promise<IAccountListResponse> {
    return this.accountService.validateAndCreate(createAccountDto);
  }

  @Post('close/:id')
  async closeAccount(@Param('id') id: string): Promise<AccountEntity> {
    return this.accountService.closeAccount(id);
  }
}

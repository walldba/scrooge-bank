import { MoneyUtils } from '../../../common/utils/money.utils';
import { AccountEntity } from '../entities/account.entity';
import { IAccountListResponse } from '../interfaces/account-response.interface';

export namespace AccountResponseMapper {
  export function mapAccountListResponse(
    account: AccountEntity
  ): IAccountListResponse {
    const { id, accountNumber, balance, status, createdAt, user } = account;

    return {
      accountId: id,
      accountNumber,
      createdAt,
      balance: MoneyUtils.format(balance ?? 0),
      status,
      userMail: user.mail,
    };
  }
}

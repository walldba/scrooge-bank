import { MoneyUtils } from '../../../common/utils/money.utils';
import { DepositEntity } from '../entities/deposit.entity';
import { IDepositCreatedResponse } from '../interfaces/deposit-response.interface';

export namespace DepositResponseMapper {
  export function mapDepositCreatedResponse(
    deposit: DepositEntity
  ): IDepositCreatedResponse {
    const { account, amount, createdAt } = deposit;

    return {
      depositId: deposit.id,
      accountNumber: account.accountNumber,
      userMail: account.user.mail,
      amount: MoneyUtils.format(amount ?? 0),
      createdAt,
    };
  }
}

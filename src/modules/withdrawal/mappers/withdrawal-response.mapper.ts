import { MoneyUtils } from '../../../common/utils/money.utils';
import { WithdrawalEntity } from '../entities/withdrawal.entity';
import { IWithdrawalCreatedResponse } from '../interfaces/withdrawal-response.interface';

export namespace WithdrawalResponseMapper {
  export function mapWithdrawalCreatedResponse(
    withdrawal: WithdrawalEntity
  ): IWithdrawalCreatedResponse {
    const { account, amount, createdAt } = withdrawal;

    return {
      withdrawalId: withdrawal.id,
      accountNumber: account.accountNumber,
      userMail: account.user.mail,
      amount: MoneyUtils.format(amount ?? 0),
      createdAt,
    };
  }
}

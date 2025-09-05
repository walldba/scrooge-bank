import { MoneyUtils } from '../../../common/utils/money.utils';
import { BankEntity } from '../entities/bank.entity';
import { IBankAvailableFundsResponse } from '../interfaces/bank-response.interface';

export namespace BankResponseMappers {
  export function mapAvailableFundsResponse(
    bank: BankEntity
  ): IBankAvailableFundsResponse {
    const { availableFunds, initialFunds, loanedFunds, depositFunds } = bank;

    return {
      availableFunds: MoneyUtils.format(availableFunds ?? 0),
      initialFunds: MoneyUtils.format(initialFunds ?? 0),
      loanedFunds: MoneyUtils.format(loanedFunds ?? 0),
      depositFunds: MoneyUtils.format(depositFunds ?? 0),
    };
  }
}

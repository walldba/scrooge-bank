import { MoneyUtils } from '../../../common/utils/money.utils';
import { LoanEntity } from '../entities/loan.entity';
import { ILoanCreatedResponse } from '../interfaces/loan-response.interface';

export namespace LoanResponseMapper {
  export function mapLoanResponse(loan: LoanEntity): ILoanCreatedResponse {
    const { id, amount, status, createdAt } = loan;

    return {
      loanId: id,
      amount: MoneyUtils.format(amount ?? 0),
      status,
      createdAt,
    };
  }
}

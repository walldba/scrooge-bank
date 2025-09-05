import { MoneyUtils } from '../../../common/utils/money.utils';
import { TransferEntity } from '../entities/transfer.entity';
import { ITransferCreatedResponse } from '../interfaces/transfer-response.interface';

export namespace TransferResponseMapper {
  export function mapTransferCreatedResponse(
    transfer: TransferEntity
  ): ITransferCreatedResponse {
    const { sourceAccount, destinationAccount, amount, createdAt } = transfer;

    return {
      transferId: transfer.id,
      sourceAccountId: sourceAccount.id,
      destinationAccountId: destinationAccount.id,
      amount: MoneyUtils.format(amount ?? 0),
      createdAt,
    };
  }
}

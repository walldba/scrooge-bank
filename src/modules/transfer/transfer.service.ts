import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TransferRepository } from './entities/transfer.repository';
import { ExecuteTransferDto } from './dto/execute-transfer.dto';
import { AccountService } from '../account/account.service';
import { Transactional } from 'typeorm-transactional';
import { AccountStatusEnum } from '../account/enums/account-status.enum';
import { ITransferCreatedResponse } from './interfaces/transfer-response.interface';
import { TransferResponseMapper } from './mappers/transfer-response.mapper';
import { AccountEntity } from '../account/entities/account.entity';

@Injectable()
export class TransferService {
  constructor(
    @Inject()
    private readonly accountService: AccountService,
    @Inject()
    private readonly transferRepository: TransferRepository
  ) {}

  @Transactional()
  async validateAndExecute(
    executeTransferDto: ExecuteTransferDto
  ): Promise<ITransferCreatedResponse> {
    const { sourceAccountId, destinationAccountId, amount } =
      executeTransferDto;

    const sourceAccount = await this.accountService.getAccountWithLock({
      where: { id: sourceAccountId, status: AccountStatusEnum.OPEN },
    });

    const destinationAccount = await this.accountService.getAccountWithLock({
      where: { id: destinationAccountId, status: AccountStatusEnum.OPEN },
    });

    this.validateAccountsToTransfer(
      sourceAccount,
      sourceAccountId,
      destinationAccount,
      destinationAccountId,
      amount
    );

    const [transfer] = await Promise.all([
      this.createTransfer(sourceAccount, destinationAccount, amount),
      this.accountService.incrementAccountBalance(destinationAccount, amount),
      this.accountService.decrementAccountBalance(sourceAccount, amount),
    ]);

    return TransferResponseMapper.mapTransferCreatedResponse(transfer);
  }

  private async createTransfer(
    sourceAccount: AccountEntity,
    destinationAccount: AccountEntity,
    amount: number
  ) {
    const transfer = this.transferRepository.create({
      sourceAccount: sourceAccount,
      destinationAccount: destinationAccount,
      amount,
    });

    await this.transferRepository.save(transfer);
    return transfer;
  }

  private validateAccountsToTransfer(
    sourceAccount: AccountEntity,
    sourceAccountId: string,
    destinationAccount: AccountEntity,
    destinationAccountId: string,
    amount: number
  ) {
    if (!sourceAccount) {
      throw new NotFoundException(
        `Source account with ID ${sourceAccountId} not found.`
      );
    }

    if (!destinationAccount) {
      throw new NotFoundException(
        `Destination account with ID ${destinationAccountId} not found.`
      );
    }

    if (sourceAccount.balance < amount) {
      throw new BadRequestException(`Insufficient funds in source account.`);
    }
  }
}

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { AccountEntity } from '../../account/entities/account.entity';
import { TransferStatusEnum } from '../enum/transfer-status.enum';
@Entity('transfers')
export class TransferEntity extends BaseEntity {
  @Column({ type: 'bigint' })
  amount: number;

  @Column({
    type: 'enum',
    enum: TransferStatusEnum,
    default: TransferStatusEnum.PENDING,
  })
  status: TransferStatusEnum;

  @ManyToOne(() => AccountEntity, (account) => account.sentTransfers, {
    eager: false,
  })
  @JoinColumn({ name: 'source_account_id' })
  sourceAccount: AccountEntity;

  @ManyToOne(() => AccountEntity, (account) => account.receivedTransfers, {
    eager: false,
  })
  @JoinColumn({ name: 'destination_account_id' })
  destinationAccount: AccountEntity;
}

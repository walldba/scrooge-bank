import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';

@Entity('bank')
export class BankEntity extends BaseEntity {
  @Column({
    type: 'bigint',
    default: 0,
    comment: 'Available funds in the bank',
  })
  availableFunds: number;

  @Column({ type: 'bigint', default: 0, comment: 'Initial funds in the bank' })
  initialFunds: number;

  @Column({ type: 'bigint', default: 0, comment: 'Loaned funds from the bank' })
  loanedFunds: number;

  @Column({
    type: 'bigint',
    default: 0,
    comment: 'Deposited funds into the bank',
  })
  depositFunds: number;
}

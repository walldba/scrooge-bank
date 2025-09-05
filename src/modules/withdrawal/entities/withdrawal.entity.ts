import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { AccountEntity } from '../../account/entities/account.entity';
@Entity('withdrawals')
export class WithdrawalEntity extends BaseEntity {
  @Column({ type: 'bigint', comment: 'Total withdrawal amount in cents' })
  amount: number;

  @ManyToOne(() => AccountEntity, (account) => account.withdrawals, {
    eager: false,
  })
  @JoinColumn({ name: 'accountId' })
  account: AccountEntity;
}

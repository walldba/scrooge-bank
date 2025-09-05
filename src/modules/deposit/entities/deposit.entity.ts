import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { AccountEntity } from '../../account/entities/account.entity';
@Entity('deposits')
export class DepositEntity extends BaseEntity {
  @Column({ type: 'bigint', comment: 'Total deposit amount in cents' })
  amount: number;

  @ManyToOne(() => AccountEntity, (account) => account.deposits, {
    eager: false,
  })
  @JoinColumn({ name: 'accountId' })
  account: AccountEntity;
}

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { AccountEntity } from '../../account/entities/account.entity';
import { LoanStatusEnum } from '../enum/loan-status.enum';

@Entity('loans')
export class LoanEntity extends BaseEntity {
  @Column({ type: 'bigint', comment: 'Loan amount in cents', nullable: false })
  amount: number;

  @Column({
    type: 'bigint',
    comment: 'Amount paid towards the loan in cents',
    default: 0,
    nullable: false,
  })
  paidAmount: number;

  @Column({
    type: 'enum',
    enum: LoanStatusEnum,
    default: LoanStatusEnum.PENDING,
  })
  status: LoanStatusEnum;

  @ManyToOne(() => AccountEntity, (account) => account.loans, { eager: false })
  @JoinColumn({ name: 'account_id' })
  account: AccountEntity;
}

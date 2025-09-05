import { Entity, Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { AccountStatusEnum } from '../enums/account-status.enum';
import { UserEntity } from '../../user/entities/user.entity';
import { DepositEntity } from '../../deposit/entities/deposit.entity';
import { WithdrawalEntity } from '../../withdrawal/entities/withdrawal.entity';
import { LoanEntity } from '../../loan/entities/loan.entity';

@Entity('accounts')
export class AccountEntity extends BaseEntity {
  @Column({ type: 'bigint', default: 0 })
  balance: number;

  @Column({
    type: 'enum',
    enum: AccountStatusEnum,
    default: AccountStatusEnum.OPEN,
  })
  status: AccountStatusEnum;

  @Column({ name: 'account_number', type: 'varchar', unique: true })
  accountNumber: string;

  @Column({ name: 'closed_at', type: 'timestamp', nullable: true })
  closedAt: Date | null;

  @ManyToOne(() => UserEntity, (user) => user.accounts)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => DepositEntity, (deposit) => deposit.account)
  deposits: DepositEntity[];

  @OneToMany(() => WithdrawalEntity, (withdrawal) => withdrawal.account)
  withdrawals: WithdrawalEntity[];

  @OneToMany(() => LoanEntity, (loan) => loan.account)
  loans: LoanEntity[];
}

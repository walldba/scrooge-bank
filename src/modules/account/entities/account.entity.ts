import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { AccountStatusEnum } from '../enums/account-status.enum';
import { UserEntity } from '../../user/entities/user.entity';

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
}

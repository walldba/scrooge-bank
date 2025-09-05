import { Entity, Column, OneToOne, JoinColumn } from 'typeorm';
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

  @Column({ type: 'datetime', nullable: true })
  closedAt: Date | null;

  @OneToOne(() => UserEntity, (user) => user.account)
  @JoinColumn()
  user: UserEntity;
}

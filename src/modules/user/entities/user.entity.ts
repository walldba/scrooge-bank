import { Entity, Column, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { AccountEntity } from '../../account/entities/account.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column('varchar', { nullable: false })
  firstName: string;

  @Column('varchar', { nullable: false })
  lastName: string;

  @Column({ unique: true, nullable: false })
  mail: string;

  @OneToOne(() => AccountEntity, (account) => account.user)
  account: AccountEntity;
}

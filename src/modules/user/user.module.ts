import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './entities/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserRepository],
  controllers: [],
  exports: [UserService, UserRepository],
})
export class UserModule {}

import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from './entities/user.repository';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject()
    private readonly userRepository: UserRepository
  ) {}

  async findOneOrCreate(createUserDto: CreateUserDto): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOneBy({
      mail: createUserDto.mail,
    });

    return existingUser ? existingUser : this.createUser(createUserDto);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }
}

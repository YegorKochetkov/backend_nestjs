import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create({
      email: createUserDto.email,
      password: createUserDto.password,
    });
  }

  async findAll() {
    return await this.userRepository.findAll();
  }
}

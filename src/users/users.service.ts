import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRolesEnum } from '../constants/constants';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({
      email: createUserDto.email,
      password: createUserDto.password,
    });
    const role = await this.roleService.findOne(UserRolesEnum.user);

    await user.$set('roles', [role.id]);

    return user;
  }

  async findAll() {
    return await this.userRepository.findAll({
      include: { all: true },
    });
  }

  async findOne(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    await user.destroy();
  }
}

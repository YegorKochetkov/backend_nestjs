import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRolesEnum } from '../constants/constants';
import { RolesService } from '../roles/roles.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SetBanDto } from './dto/set-ban.dto';
import { SetRoleDto } from './dto/set-role.dto';
import { User } from './models/user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private roleService: RolesService,
  ) {
    this.userRepository.addScope('withoutPassword', {
      attributes: { exclude: ['password'] },
    });
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create({
      email: createUserDto.email,
      password: createUserDto.password,
    });
    const role = await this.roleService.findOne(UserRolesEnum.user);

    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  async findAll(scope = 'defaultScope') {
    return await this.userRepository.scope(scope).findAll({
      include: { all: true },
    });
  }

  async findOne(id: number, scope = 'defaultScope') {
    return await this.userRepository.scope(scope).findByPk(id);
  }

  async findOneByEmail(email: string, scope = 'defaultScope') {
    return await this.userRepository.scope(scope).findOne({
      where: { email },
      include: { all: true },
    });
  }

  async remove(id: number, scope = 'defaultScope') {
    const user = await this.findOne(id, scope);
    await user.destroy();
  }

  async setRole(setRoleDto: SetRoleDto, scope = 'defaultScope') {
    const user = await this.findOne(setRoleDto.userId, scope);
    const role = await this.roleService.findOne(setRoleDto.role);

    if (user && role) {
      await user.$add('role', role.id);
    }

    throw new HttpException('User or role not found', HttpStatus.NOT_FOUND);
  }

  async setBan(setBanDto: SetBanDto, scope = 'defaultScope') {
    const user = await this.findOne(setBanDto.userId, scope);
  }
}

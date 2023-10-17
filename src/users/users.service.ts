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
    this.userRepository.addScope(
      'withoutPassword',
      {
        attributes: { exclude: ['password'] },
      },
      { override: true },
    );
  }

  async create(createUserDto: CreateUserDto) {
    await this.userRepository.sync();

    const user = await this.userRepository.create({
      email: createUserDto.email,
      password: createUserDto.password,
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const role = await this.roleService.findOne(UserRolesEnum.user);

    await user.$set('roles', [role.id]);
    user.roles = [role];

    return user;
  }

  async findAll(scope = 'defaultScope') {
    await this.userRepository.sync();

    return await this.userRepository.scope(scope).findAll({
      include: { all: true },
    });
  }

  async findOne(userId: number, scope = 'defaultScope') {
    await this.userRepository.sync();

    const user = await this.userRepository
      .scope(scope)
      .findByPk(userId, { include: { all: true } });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findOneByEmail(email: string, scope = 'defaultScope') {
    await this.userRepository.sync();

    return await this.userRepository.scope(scope).findOne({
      where: { email },
      include: { all: true },
    });
  }

  async remove(userId: number, scope = 'defaultScope') {
    await this.userRepository.sync();

    const user = await this.userRepository.scope(scope).findByPk(userId);

    if (!user) {
      return;
    }

    await user.destroy();
  }

  async setRole(setRoleDto: SetRoleDto, scope = 'defaultScope') {
    await this.userRepository.sync();

    const user = await this.userRepository
      .scope(scope)
      .findByPk(setRoleDto.userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const role = await this.roleService.findOne(setRoleDto.role);

    if (!role) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    await user.$add('role', role.id);
  }

  async setBan(setBanDto: SetBanDto, scope = 'defaultScope') {
    await this.userRepository.sync();

    const user = await this.userRepository
      .scope(scope)
      .findByPk(setBanDto.userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.banned = true;
    user.banReason = setBanDto.banReason;
    await user.save();
  }

  async removeBan(userId: number, scope = 'defaultScope') {
    await this.userRepository.sync();

    const user = await this.userRepository.scope(scope).findByPk(userId);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    user.banned = false;
    user.banReason = null;
    await user.save();
  }
}

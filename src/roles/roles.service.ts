import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRolesEnum } from '../constants/constants';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(createRoleDto: CreateRoleDto) {
    if (!Object.values(UserRolesEnum).includes(createRoleDto.role)) {
      throw new HttpException('Wrong value of role', HttpStatus.BAD_REQUEST);
    }

    return await this.roleRepository.create(createRoleDto).catch((error) => {
      throw new HttpException(`${error}`, HttpStatus.BAD_REQUEST);
    });
  }

  async findOne(role: UserRolesEnum) {
    return await this.roleRepository.findOne({ where: { role } });
  }

  async findAll() {
    return await this.roleRepository.findAll();
  }
}

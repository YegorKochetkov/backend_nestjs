import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserRolesEnum } from '../constants/constants';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/role.model';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Role) private roleRepository: typeof Role) {}

  async create(createRoleDto: CreateRoleDto) {
    return await this.roleRepository.create(createRoleDto);
  }

  async findOne(role: UserRolesEnum) {
    return await this.roleRepository.findOne({ where: { role } });
  }
}

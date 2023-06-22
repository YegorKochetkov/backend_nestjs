import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserRolesEnum } from '../constants/constants';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/role.model';
import { RolesService } from './roles.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @ApiOperation({ summary: 'Create new role' })
  @ApiResponse({ status: 200, type: Role })
  @ApiBody({ type: CreateRoleDto })
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiOperation({ summary: 'Get role info' })
  @ApiResponse({ status: 200, type: Role })
  @ApiParam({ name: 'role', enum: UserRolesEnum })
  @Get('/:role')
  findOne(@Param('role') role: UserRolesEnum) {
    return this.roleService.findOne(role);
  }

  @ApiOperation({ summary: 'Get all roles info' })
  @ApiResponse({ status: 200, type: [Role] })
  @Get()
  findAll() {
    return this.roleService.findAll();
  }
}

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserRolesEnum } from '../constants/constants';
import { CreateRoleDto } from './dto/create-role.dto';
import { Role } from './models/role.model';
import { RolesService } from './roles.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles-auth.decorator';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
  constructor(private roleService: RolesService) {}

  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new role (admin privileges are required)' })
  @ApiResponse({ status: 201, type: Role })
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

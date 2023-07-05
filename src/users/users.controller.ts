import { Roles } from '../auth/decorators/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserRolesEnum } from '../constants/constants';
import { SetBanDto } from './dto/set-ban.dto';
import { SetRoleDto } from './dto/set-role.dto';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  @Get()
  findAll() {
    return this.usersService.findAll('withoutPassword');
  }

  @ApiOperation({ summary: 'Get user' })
  @ApiResponse({ status: 200, type: User })
  @ApiParam({ name: 'userId' })
  @Get('/:userId')
  findOne(@Param('userId') id: number) {
    return this.usersService.findOne(id, 'withoutPassword');
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user (authorize required)' })
  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'userId' })
  @Delete('/:userId')
  remove(@Param('userId') id: number) {
    return this.usersService.remove(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRolesEnum.admin)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Set role for user (admin privileges are required)',
  })
  @ApiResponse({ status: 201 })
  @ApiBody({ type: SetRoleDto })
  @Post('/role')
  setRole(@Body() setRoleDto: SetRoleDto) {
    return this.usersService.setRole(setRoleDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRolesEnum.admin)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ban a user (admin privileges are required)' })
  @ApiResponse({ status: 201 })
  @ApiBody({ type: SetBanDto })
  @Post('/ban')
  setBan(@Body() setBanDto: SetBanDto) {
    return this.usersService.setBan(setBanDto);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRolesEnum.admin)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Remove ban from a user (admin privileges are required)',
  })
  @ApiResponse({ status: 201 })
  @ApiParam({ name: 'userId' })
  @Post('/unban/:userId')
  removeBan(@Param('userId') id: number) {
    return this.usersService.removeBan(id);
  }
}

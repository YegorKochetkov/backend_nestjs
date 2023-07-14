import { Roles } from '../auth/decorators/roles-auth.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { UserRolesEnum } from '../constants/constants';
import { SetBanDto } from './dto/set-ban.dto';
import { SetRoleDto } from './dto/set-role.dto';
import { UserIdParamDto } from './dto/user-id-param.dto';
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
  @Get('/:userId')
  findOne(@Param() userId: UserIdParamDto) {
    return this.usersService.findOne(userId.userId, 'withoutPassword');
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user (authorize required)' })
  @ApiResponse({ status: 200 })
  @Delete('/:userId')
  remove(@Param() userId: UserIdParamDto) {
    return this.usersService.remove(userId.userId);
  }

  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Set role for user (authorize required)',
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
  @Post('/unban/:userId')
  removeBan(@Param() userId: UserIdParamDto) {
    return this.usersService.removeBan(userId.userId);
  }
}

import { Controller, Delete, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { UsersService } from './users.service';

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
    // TODO: ADD ERROR HANDLER
    return this.usersService.findOne(id, 'withoutPassword');
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200 })
  @ApiParam({ name: 'userId' })
  @Delete('/:userId')
  remove(@Param('userId') id: number) {
    return this.usersService.remove(id, 'withoutPassword');
  }
}

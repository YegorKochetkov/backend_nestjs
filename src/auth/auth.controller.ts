import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login in' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: { token: { type: 'string' } },
    },
  })
  @ApiBody({ type: CreateUserDto })
  @Post('/login')
  login(@Body() userDto: CreateUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({
    status: 200,
    schema: {
      type: 'object',
      properties: { token: { type: 'string' } },
    },
  })
  @ApiBody({ type: CreateUserDto })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}

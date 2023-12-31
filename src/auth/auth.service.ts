import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokenPayload } from '../constants/constants';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.findOneByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'A user with such an email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userDto.password, salt);
    const user = await this.userService.create({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private generateToken(user: User) {
    const payload: TokenPayload = {
      email: user.email,
      id: user.id,
      roles: user.roles,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(userDto.email);

    if (!user) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'No user with this email',
      });
    }

    const isPasswordsEqual = await bcrypt.compare(
      userDto.password,
      user.password,
    );

    if (!isPasswordsEqual) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Wrong password',
      });
    }

    return user;
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/models/user.model';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: CreateUserDto) {
    console.log(userDto);
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

  generateToken(user: User) {
    const payload = { email: user.email, id: user.id, roles: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }
}

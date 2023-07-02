import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenPayload, UserRolesEnum } from '../constants/constants';
import { ROLES_KEY } from './decorators/roles-auth.decorator';
import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const requiredRoles = this.reflector.getAllAndOverride<UserRolesEnum[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );

      const user: TokenPayload = await this.jwtService.verifyAsync(token);
      const userRoles = user.roles.map((role) => role.role);

      if (!requiredRoles) {
        return true;
      }

      request['user'] = user;

      return requiredRoles.some((role) => userRoles.includes(role));
    } catch (error) {
      throw new HttpException(
        'Admin privileges are required',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  private extractTokenFromHeader(request: Request) {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}

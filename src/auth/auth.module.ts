import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret:
        process.env.PRIVATE_KEY ||
        'CREATE_A_COMPLEX_SECRET_AND_KEEP_IT_SAFE_OUTSIDE_OF_THE_SOURCE_CODE',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}

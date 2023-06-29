import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRoles } from '../users/models/user-roles.model';
import { User } from '../users/models/user.model';
import { Role } from './models/role.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [RolesService],
  controllers: [RolesController],

  imports: [
    SequelizeModule.forFeature([Role, User, UserRoles]),
    forwardRef(() => AuthModule),
  ],
  exports: [RolesService],
})
export class RolesModule {}

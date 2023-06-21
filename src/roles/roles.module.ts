import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserRoles } from 'src/users/models/user_roles.model';
import { User } from 'src/users/models/user.model';
import { Role } from './models/role.model';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
})
export class RolesModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { Post } from './posts/models/post.model';
import { PostsModule } from './posts/posts.module';
import { Role } from './roles/models/role.model';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './users/models/user-roles.model';
import { User } from './users/models/user.model';
import { UsersModule } from './users/users.module';

dotenv.config();

let dialectOptions: object = {
  ssl: {
    require: true,
  },
};

if (process.env.NODE_ENV === 'development') {
  dialectOptions = {};
}

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: `.env.${process.env.NODE_ENV}` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      database: process.env.POSTGRES_DB,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      models: [User, Role, UserRoles, Post],
      autoLoadModels: true,
      dialectOptions,
    }),
    ServeStaticModule.forRoot({ rootPath: path.resolve(__dirname, 'static') }),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
    FilesModule,
  ],
})
export class AppModule {}

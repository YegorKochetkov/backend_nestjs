import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../../users/models/user-roles.model';
import { User } from '../../users/models/user.model';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface RoleCreationAttrs {
  role: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unique identifier' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Unique value of the role' })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  role: string;

  @ApiProperty({ example: 'Admin', description: 'Description of the role' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}

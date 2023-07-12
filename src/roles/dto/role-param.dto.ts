import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { UserRolesEnum } from '../../constants/constants';

export class RoleParamDto {
  @IsEnum(UserRolesEnum)
  @ApiProperty({
    name: 'role',
    enum: UserRolesEnum,
    example: 'admin',
    description: 'Unique value of the role',
  })
  role: UserRolesEnum;
}

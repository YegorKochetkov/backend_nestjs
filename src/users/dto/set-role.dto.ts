import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { UserRolesEnum } from '../../constants/constants';

export class SetRoleDto {
  @IsEnum(UserRolesEnum)
  @ApiProperty({
    example: 'moderator',
    description: 'User`s new role',
    enum: UserRolesEnum,
  })
  readonly role: UserRolesEnum;

  @IsNumber({}, { message: 'Should be a number' })
  @ApiProperty({ example: '12', description: 'User`s id' })
  readonly userId: number;
}

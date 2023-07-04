import { ApiProperty } from '@nestjs/swagger';
import { UserRolesEnum } from '../../constants/constants';

export class SetRoleDto {
  @ApiProperty({
    example: 'moderator',
    description: 'User`s new role',
    enum: UserRolesEnum,
  })
  readonly role: UserRolesEnum;

  @ApiProperty({ example: '12', description: 'User`s id' })
  readonly userId: number;
}

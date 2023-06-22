import { ApiProperty } from '@nestjs/swagger';
import { UserRolesEnum } from '../../constants/constants';

export class CreateRoleDto {
  @ApiProperty({ example: 'admin', description: 'Unique value of the role' })
  readonly role: UserRolesEnum;

  @ApiProperty({
    example: 'admin rules',
    description: 'Description of the role',
  })
  readonly description: string;
}

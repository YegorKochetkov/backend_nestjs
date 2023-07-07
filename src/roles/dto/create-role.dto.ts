import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { UserRolesEnum } from '../../constants/constants';

export class CreateRoleDto {
  @IsEnum(UserRolesEnum)
  @ApiProperty({
    example: 'admin',
    description: 'Unique value of the role',
    enum: UserRolesEnum,
  })
  readonly role: UserRolesEnum;

  @IsString({ message: 'Should be a string' })
  @ApiProperty({
    example: 'admin rules',
    description: 'Description of the role',
  })
  readonly description: string;
}

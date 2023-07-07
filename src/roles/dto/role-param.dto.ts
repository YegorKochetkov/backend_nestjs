import { IsEnum } from 'class-validator';
import { UserRolesEnum } from '../../constants/constants';

export class RoleParamDto {
  @IsEnum(UserRolesEnum)
  role: UserRolesEnum;
}

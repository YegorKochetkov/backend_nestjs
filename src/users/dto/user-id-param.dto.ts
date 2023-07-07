import { IsNumberString } from 'class-validator';

export class UserIdParamDto {
  @IsNumberString()
  userId: number;
}

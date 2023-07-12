import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class UserIdParamDto {
  @IsNumberString()
  @ApiProperty({
    name: 'userId',
    example: 12,
    description: 'User id number',
    type: Number,
  })
  userId: number;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class UserIdQueryDto {
  @IsOptional()
  @IsNumberString()
  @ApiPropertyOptional({
    name: 'userId',
    example: 12,
    description:
      'User id number (optional, omit to search for all posts from all users)',
    type: Number,
    required: false,
  })
  userId: number;
}

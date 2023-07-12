import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class PostIdParamDto {
  @IsNumberString()
  @ApiProperty({
    name: 'postId',
    example: 12,
    description: 'Post id number',
    type: Number,
  })
  postId: number;
}

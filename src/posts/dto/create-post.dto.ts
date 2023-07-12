import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsString, Length } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Should be a string' })
  @Length(1, 256, { message: 'Should be from 1 to 256 symbols' })
  @ApiProperty({ example: 'Post title', description: 'Post`s title' })
  readonly title: string;

  @IsString({ message: 'Should be a string' })
  @IsEmpty()
  @ApiProperty({ example: 'Bla-bla-bla', description: 'Post`s content' })
  readonly content: string;
}

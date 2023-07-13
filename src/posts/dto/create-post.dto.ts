import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, Length, MinLength } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Should be a string' })
  @Length(1, 256, { message: 'Should be from 1 to 256 symbols' })
  @ApiProperty({ example: 'Post title', description: 'Post`s title' })
  readonly title: string;

  @IsString({ message: 'Should be a string' })
  @MinLength(1)
  @ApiProperty({ example: 'Bla-bla-bla', description: 'Post`s content' })
  readonly content: string;

  @IsNumberString()
  @ApiProperty({ example: '12', description: 'Id of the author of the post' })
  readonly userId: number;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  image: Express.Multer.File;
}

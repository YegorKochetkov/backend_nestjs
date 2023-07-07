import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Should be a string' })
  @IsEmail({}, { message: 'Wrong email format' })
  @ApiProperty({ example: 'user@mail.com', description: 'User`s email' })
  readonly email: string;

  @IsString({ message: 'Should be a string' })
  @Length(8, 64, { message: 'Should be from 8 to 64 symbols' })
  @ApiProperty({ example: 'password12345', description: 'User`s password' })
  readonly password: string;
}

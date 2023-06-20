import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.com', description: 'User`s email' })
  readonly email: string;

  @ApiProperty({ example: 'password12345', description: 'User`s password' })
  readonly password: string;
}

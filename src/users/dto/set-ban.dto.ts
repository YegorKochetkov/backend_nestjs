import { ApiProperty } from '@nestjs/swagger';

export class SetBanDto {
  @ApiProperty({ example: 'moderator', description: 'User`s new role' })
  readonly banReason: string;

  @ApiProperty({ example: '12', description: 'User`s id' })
  readonly userId: number;
}

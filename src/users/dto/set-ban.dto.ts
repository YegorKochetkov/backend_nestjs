import { ApiProperty } from '@nestjs/swagger';

export class SetBanDto {
  @ApiProperty({ example: 'scam', description: 'Reason to ban user' })
  readonly banReason: string;

  @ApiProperty({ example: '12', description: 'User`s id' })
  readonly userId: number;
}

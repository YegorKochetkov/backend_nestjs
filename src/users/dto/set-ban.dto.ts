import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class SetBanDto {
  @IsString({ message: 'Should be a string' })
  @ApiProperty({ example: 'scam', description: 'Reason to ban user' })
  readonly banReason: string;

  @IsNumber({}, { message: 'Should be a number' })
  @ApiProperty({ example: '12', description: 'User`s id' })
  readonly userId: number;
}

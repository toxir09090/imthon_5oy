// like.dto.ts
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLikeDto {
  @ApiProperty({ example: 1 })
  @Type(() => Number)
  @IsNumber()
  userId: number;

  @ApiProperty({ example: 10 })
  @Type(() => Number)
  @IsNumber()
  songId: number;
}

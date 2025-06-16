import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsInt,
} from 'class-validator';

export class CreateSongDto {
  @ApiProperty({
    example: 'Lose Yourself',
    description: "Qo'shiq nomi",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Hip Hop',
    description: "Qo'shiq janri (ixtiyoriy)",
    required: false,
  })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiProperty({
    example: '/uploads/lose-yourself.mp3',
    description: 'Audio fayl URL manzili',
    required: false,
    format:'binary'
  })
  @IsOptional()
  @IsUrl()
  audio?: string;

  @ApiProperty({
    example: '/uploads/cover.jpg',
    description: "Qo'shiq uchun cover rasm manzili",
    required: false,
    format: 'binary'
  })
  @IsOptional()
  @IsUrl()
  image?: string;

  @ApiProperty({
    type: "number"
  })
  @IsOptional()
  playlistId: number
}

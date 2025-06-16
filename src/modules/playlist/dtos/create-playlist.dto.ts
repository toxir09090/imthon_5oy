import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreatePlaylistDto {
  @ApiProperty({
    example: 'Morning Vibes',
    description: 'Playlist nomi',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Bu playlist ertalabki kayfiyat uchun moljallangan.',
    description: 'Playlist haqida qisqacha tavsif (ixtiyoriy)',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: "number"
  })
  @IsOptional()
  artistId: number;
}

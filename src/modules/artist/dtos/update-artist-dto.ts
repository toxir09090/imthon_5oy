import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateArtistDto {
  @ApiPropertyOptional({ example: 'New Artist Name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Pop' })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiPropertyOptional({ example: '' })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}

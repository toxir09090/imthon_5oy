import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({
    example: 'Eminem',
    description: 'Artistning ismi',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'Rap',
    description: 'Janri (ixtiyoriy)',
  })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiProperty({
    type: 'string',
    format: 'binary',
  }) 
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    type: "number"
  })
  @IsOptional()
  userId: number;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsIn, IsOptional, IsPositive } from 'class-validator';
import { ArtistSortFields, SortOrder } from 'src/enum/query.enum';

export class ArtistQueryDto {
  @ApiPropertyOptional({
    example: 10,
    description: 'Nechta artist qaytarilsin (limit)',
  })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  limit?: number;

  @ApiPropertyOptional({ example: 1, description: 'Qaysi sahifa (page)' })
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  page?: number;

  @ApiPropertyOptional({
    example: ArtistSortFields.name,
    enum: ArtistSortFields,
    description: 'Qaysi field boyicha sort qilish',
  })
  @IsOptional()
  @IsEnum(ArtistSortFields)
  sortField?: ArtistSortFields;

  @ApiPropertyOptional({
    example: SortOrder.ASC,
    enum: SortOrder,
    description: 'Sort tartibi (ASC yoki DESC)',
  })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: SortOrder;
}

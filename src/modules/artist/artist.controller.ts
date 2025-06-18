import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistQueryDto, CreateArtistDto, UpdateArtistDto } from './dtos';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CheckFileMimeType, CheckFileSizePipe } from 'src/pipes';
import { Protected } from 'src/decorators/protected.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { UserRoles } from 'src/enum/roles.enum';
import { Artist } from './models';

@ApiBearerAuth()
@ApiTags('Artists')
@Controller('artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @Protected(false)
  @Roles([UserRoles.ARTIST, UserRoles.ADMIN])
  @UseInterceptors(FileInterceptor('imageUrl'))
  @ApiConsumes('multipart/form-data')
  create(
    @Body() dto: CreateArtistDto,
    @UploadedFile(
      new CheckFileSizePipe(1000000 * 3),
      new CheckFileMimeType(['png', 'jpg']),
    )
    file?: Express.Multer.File,
  ) {
    return this.artistService.create(dto, file);
  }

  @Get()
  @Protected(false)
  @Roles([UserRoles.ADMIN])
  async findAll(@Query() query: ArtistQueryDto): Promise<Artist[]> {
    return this.artistService.findAll(query);
  }

  @Get(':id')
  @Protected(false)
  @Roles([UserRoles.ADMIN])
  findOne(@Param('id') id: string) {
    return this.artistService.findOne(+id);
  }

  @Put(':id')
  @Protected(false)
  @Roles([UserRoles.ARTIST])
  update(@Param('id') id: string, @Body() dto: UpdateArtistDto) {
    return this.artistService.update(+id, dto);
  }

  @Delete(':id')
  @Protected(false)
  @Roles([UserRoles.ADMIN, UserRoles.ARTIST])
  remove(@Param('id') id: string) {
    return this.artistService.remove(+id);
  }
}

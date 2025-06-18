import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { SongService } from './songs.service';
import { Song } from './models';
import { CreateSongDto } from './dtos';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Protected } from 'src/decorators/protected.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { UserRoles } from 'src/enum/roles.enum';
import { CheckFileMimeType, CheckFileSizePipe } from 'src/pipes';

@ApiBearerAuth()
@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  @Protected(false)
  @Roles([UserRoles.ADMIN, UserRoles.ARTIST, UserRoles.USER])
  async getAll(): Promise<Song[]> {
    return this.songService.getAll();
  }

  @Get(':id')
  @Protected(false)
  @Roles([UserRoles.ADMIN])
  async getOne(@Param('id') id: number) {
    return this.songService.getOne(id);
  }

  @Post()
  @Protected(false)
  @Roles([UserRoles.ARTIST])
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  async create(
    @Body() dto: CreateSongDto,
    @UploadedFiles(
      new CheckFileSizePipe(1000000 * 3),
      new CheckFileMimeType(['png', 'jpg']),
    )
    files: {
      audio?: Express.Multer.File[];
      image?: Express.Multer.File[];
    },
  ): Promise<Song> {
    return this.songService.create(dto, files.audio?.[0], files.image?.[0]);
  }

  @Delete(':id')
  @Protected(false)
  @Roles([UserRoles.ADMIN, UserRoles.ARTIST])
  async delete(@Param('id', ParseIntPipe) id: number) {
    const result = await this.songService.delete(id);
    if (!result) {
      throw new NotFoundException('Song not found or already deleted');
    }
    return { message: 'Song deleted successfully' };
  }
}

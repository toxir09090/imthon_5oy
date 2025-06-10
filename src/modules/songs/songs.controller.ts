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
} from '@nestjs/common';
import { SongService } from './songs.service';
import { Song } from './models';
import { CreateSongDto } from './dtos';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  @Get()
  async getAll(): Promise<Song[]> {
    return this.songService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.songService.getOne(id);
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'audio', maxCount: 1 },
      { name: 'image', maxCount: 1 },
    ]),
  )
  async create(
    @Body() dto: CreateSongDto,
    @UploadedFiles()
    files: {
      audio?: Express.Multer.File[];
      image?: Express.Multer.File[];
    },
  ): Promise<Song> {
    return this.songService.create(dto, files.audio?.[0], files.image?.[0]);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<{ message: string }> {
    const count = await this.songService.delete(id);
    return { message: count > 0 ? 'Deleted successfully' : 'Musiqa topilmadi' };
  }
}

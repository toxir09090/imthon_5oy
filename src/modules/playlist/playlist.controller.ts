import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dtos';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('playlists')
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get()
  async getAll() {
    return this.playlistService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.playlistService.getOne(+id);
  }

  @Post()
  async create(@Body() dto: CreatePlaylistDto) {
    return this.playlistService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.playlistService.delete(+id);
  }
}

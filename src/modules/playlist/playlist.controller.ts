import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { CreatePlaylistDto } from './dtos';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Protected } from 'src/decorators/protected.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { UserRoles } from 'src/enum/roles.enum';

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
  @Protected(false)
  @Roles([UserRoles.ARTIST])
  async create(@Body() dto: CreatePlaylistDto) {
    console.log("dot p", dto);
    
    return this.playlistService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.playlistService.delete(+id);
  }
}

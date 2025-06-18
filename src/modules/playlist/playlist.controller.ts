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
  @Protected(false)
  @Roles([UserRoles.ADMIN, UserRoles.ARTIST, UserRoles.USER])
  async getAll() {
    return this.playlistService.getAll();
  }

  @Get(':id')
  @Protected(false)
  @Roles([UserRoles.ADMIN])
  async getOne(@Param('id') id: string) {
    return this.playlistService.getOne(+id);
  }

  @Post()
  @Protected(false)
  @Roles([UserRoles.ARTIST])
  async create(@Body() dto: CreatePlaylistDto) {
    return this.playlistService.create(dto);
  }

  @Delete(':id')
  @Protected(false)
  @Roles([UserRoles.ADMIN, UserRoles.ARTIST])
  async delete(@Param('id') id: string) {
    return this.playlistService.delete(+id);
  }
}

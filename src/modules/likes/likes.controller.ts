import { Controller, Post, Body, Get, Delete, Param } from '@nestjs/common';
import { LikeService } from './likes.service';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async create(@Body('song_id') song_id: number) {
    return this.likeService.create(song_id);
  }

  @Get()
  async findAll() {
    return this.likeService.findAll();
  }

  @Delete(':song_id')
  async delete(@Param('song_id') song_id: string) {
    return this.likeService.delete(+song_id);
  }
}

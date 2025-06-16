import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { LikeService } from './likes.service';
import { CreateLikeDto } from './dtos';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  async create(@Body() dto: CreateLikeDto) {
    return this.likeService.create(dto.userId, dto.songId);
  }

  @Get()
  async findAll() {
    return this.likeService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.likeService.delete(id);
  }

  @Delete('user/:userId/song/:songId')
  async deleteByUserAndSong(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('songId', ParseIntPipe) songId: number,
  ) {
    return this.likeService.deleteByUserAndSong(userId, songId);
  }
}

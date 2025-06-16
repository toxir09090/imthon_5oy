import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { LikeService } from './likes.service';
import { LikeController } from './likes.controller';
import { Like } from './models/likes-model';
import { Song } from '../songs/models/songs.model';
import { Users } from '../users/models/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Like, Song, Users])],
  providers: [LikeService],
  controllers: [LikeController],
  exports: [LikeService],
})
export class LikeModule {}

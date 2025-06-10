import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Song } from './models';
import { Artist } from '../artist';
import { SongController } from './songs.controller';
import { SongService } from './songs.service';
import { FsHelper } from 'src/helpers/fs.helper';

@Module({
  imports: [SequelizeModule.forFeature([Song, Artist])],
  controllers: [SongController],
  providers: [SongService, FsHelper],
})
export class SongModule {}

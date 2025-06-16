import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Song } from './models';
import { SongController } from './songs.controller';
import { SongService } from './songs.service';
import { FsHelper } from 'src/helpers/fs.helper';

@Module({
  imports: [SequelizeModule.forFeature([Song])],
  controllers: [SongController],
  providers: [SongService, FsHelper],
})
export class SongModule {}

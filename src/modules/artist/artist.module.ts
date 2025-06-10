import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Artist } from './models';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { FsHelper } from 'src/helpers/fs.helper';
import { Playlist } from '../playlist';

@Module({
  imports: [SequelizeModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistService, FsHelper],
})
export class ArtistModule {}

import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Artist } from './models/artist.model';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { FsHelper } from 'src/helpers/fs.helper';

@Module({
  imports: [
    SequelizeModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistService, FsHelper],
})
export class ArtistModule {}

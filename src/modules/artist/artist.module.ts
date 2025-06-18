import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Artist } from './models/artist.model';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { FsHelper } from 'src/helpers/fs.helper';
import { RedisService } from '../redis/redis.service';

@Module({
  imports: [
    SequelizeModule.forFeature([Artist])],
  controllers: [ArtistController],
  providers: [ArtistService, FsHelper, RedisService],
})
export class ArtistModule {}
 
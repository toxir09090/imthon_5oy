import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Like } from './models';
import { LikeController } from './likes.controller';
import { LikeService } from './likes.service';

@Module({
  imports: [SequelizeModule.forFeature([Like])],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}

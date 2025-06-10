import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './models';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like) private readonly likeModel: typeof Like,
  ) {}

  async create(song_id: number) {
    try {
      const newLike = await this.likeModel.create({ song_id });
      return newLike;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      return await this.likeModel.findAll();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async delete(song_id: number) {
    try {
      const like = await this.likeModel.findOne({ where: { song_id } });
      if (!like) {
        throw new NotFoundException('Like topilmadi');
      }
      await like.destroy();
      return { message: 'deleted' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}

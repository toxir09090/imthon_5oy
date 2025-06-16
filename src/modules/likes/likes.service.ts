import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Like } from './models/likes-model';
import { Song } from '../songs/models/songs.model';
import { Users } from '../users/models/user.model';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like) private likeModel: typeof Like,
    @InjectModel(Song) private songModel: typeof Song,
    @InjectModel(Users) private userModel: typeof Users,
    // private userService: UserService
  ) {}

  async create(userId: number, songId: number) {
    const song = await this.songModel.findByPk(songId);

    const existing = await this.likeModel.findOne({
      where: { userId, song_id: songId },
    });
    if (existing) {
      throw new BadRequestException('Bu qoshiq allaqachon like qilingan');
    }

    return this.likeModel.create({ userId, song_id: songId });
  }

  async findAll() {
    return this.likeModel.findAll({
      include: [
        { model: Users, attributes: ['id', 'name'] },
        { model: Song, attributes: ['id', 'title'] },
      ],
      order: [['createdAt', 'DESC']],
    });
  }

  async delete(id: number) {
    const deleted = await this.likeModel.destroy({ where: { id } });
    if (!deleted) throw new NotFoundException('Like topilmadi');
    return 'deleted';
  }

  async deleteByUserAndSong(userId: number, songId: number) {
    const deleted = await this.likeModel.destroy({
      where: { userId, song_id: songId },
    });
    if (!deleted) throw new NotFoundException('Like topilmadi');
    return 'deleted';
  }
}

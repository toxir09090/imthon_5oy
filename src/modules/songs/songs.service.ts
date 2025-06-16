import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Song } from './models';
import { CreateSongDto } from './dtos';
import { FsHelper } from 'src/helpers/fs.helper';
import { Like } from '../likes/models/likes-model';

@Injectable()
export class SongService {
  constructor(
    @InjectModel(Song) private readonly songModel: typeof Song,
    private readonly fsHelper: FsHelper,
  ) {}
 
  async getAll(): Promise<Song[]> {
    return this.songModel.findAll({ include: Like });
  }

  async getOne(id: number) {
    return this.songModel.findByPk(id);
  }

  async create(
    dto: CreateSongDto,
    audioFile?: Express.Multer.File,
    imageFile?: Express.Multer.File,
  ): Promise<Song> {
    const uploaded = this.fsHelper.uploadFiles({
      audios: audioFile ? [audioFile] : [],
      images: imageFile ? [imageFile] : [],
      videos: [],
    });

    const audioUrl = uploaded.audios[0] ?? null;
    const coverImage = uploaded.images[0] ?? null;

    const song = await this.songModel.create({
      ...dto,
      audioUrl,
      coverImage,
    });

    return song;
  }

  async delete(id: number): Promise<number> {
    return this.songModel.destroy({ where: { id } });
  }
}

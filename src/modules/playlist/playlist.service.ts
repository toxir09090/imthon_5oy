import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from './models';
import { CreatePlaylistDto } from './dtos';
import { Artist } from '../artist';

@Injectable()
export class PlaylistService {
  constructor(@InjectModel(Playlist) private playlistModel: typeof Playlist) {}

  async getAll(): Promise<Playlist[]> {
    return this.playlistModel.findAll();
  }

  async getOne(id: number) {
    return this.playlistModel.findByPk(id);
  }

  async create(dto: CreatePlaylistDto): Promise<Playlist> {
    return await this.playlistModel.create({
      name: dto.name,
      description: dto.description,
      userId: dto.userId
    });
  }

  async delete(id: number): Promise<number> {
    return await this.playlistModel.destroy({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Playlist } from './models';
import { CreatePlaylistDto } from './dtos';
import { Song } from '../songs/models/songs.model';

@Injectable()
export class PlaylistService {
  constructor(@InjectModel(Playlist) private playlistModel: typeof Playlist) {}

  async getAll(): Promise<Playlist[]> {
    return this.playlistModel.findAll({include: Song});
  }

  async getOne(id: number) {
    return this.playlistModel.findByPk(id);
  }

  async create(dto: CreatePlaylistDto) {
    console.log(dto);
    
    return this.playlistModel.create(dto as any); 
  }

  async delete(id: number): Promise<number> {
    return await this.playlistModel.destroy({ where: { id } });
  }
}

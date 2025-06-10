import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Artist } from './models/artist.model';
import { CreateArtistDto, UpdateArtistDto } from './dtos';
import { FsHelper } from 'src/helpers/fs.helper';
import { Playlist } from '../playlist';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist)
    private readonly artistModel: typeof Artist,
    private readonly fsHelper: FsHelper,
  ) {}

  async create(
  dto: CreateArtistDto,
  file?: Express.Multer.File,
): Promise<Artist> {
  const imageUrl = file ? this.fsHelper.uploadsImage(file): undefined;

  const artist = await this.artistModel.create({
    name: dto.name,
    genre: dto.genre,
    imageUrl: dto.image,
  });

  return artist;
}

  async findAll(): Promise<Artist[]> {
    return this.artistModel.findAll();
  }

  async findOne(id: number): Promise<Artist> {
    const artist = await this.artistModel.findByPk(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }
    return artist;
  }

  async update(id: number, dto: UpdateArtistDto): Promise<Artist> {
    const artist = await this.findOne(id);
    await artist.update(dto);
    return artist;
  }

  async remove(id: number): Promise<void> {
    const artist = await this.findOne(id);
    await artist.destroy();
  }
}

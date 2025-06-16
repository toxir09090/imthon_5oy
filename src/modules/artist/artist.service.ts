import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Artist } from './models/artist.model';
import { ArtistQueryDto, CreateArtistDto, UpdateArtistDto } from './dtos';
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
    const imageUrl = file ? this.fsHelper.uploadsImage(file) : undefined;

    const artist = await this.artistModel.create({
      name: dto.name,
      genre: dto.genre,
      imageUrl: imageUrl,
      userId: dto.userId,
    });

    return artist;
  }

  async findAll(query: ArtistQueryDto): Promise<Artist[]> {
    const {
      limit = 10,
      page = 1,
      sortField = 'createdAt',
      sortOrder = 'ASC',
    } = query;

    const offset = (page - 1) * limit;

    return this.artistModel.findAll({
      limit,
      offset,
      order: [[sortField, sortOrder]],
      include: [Playlist],
    });
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

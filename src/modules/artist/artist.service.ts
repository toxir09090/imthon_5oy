import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Artist } from './models/artist.model';
import { ArtistQueryDto, CreateArtistDto, UpdateArtistDto } from './dtos';
import { FsHelper } from 'src/helpers/fs.helper';
import { Playlist } from '../playlist';
import { RedisService } from '../redis/redis.service';

@Injectable()
export class ArtistService {
  constructor(
    @InjectModel(Artist)
    private readonly artistModel: typeof Artist,
    private readonly fsHelper: FsHelper,
    private readonly redis: RedisService,
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
  async findOne(id: number) {
    const redisArtist = await this.redis.get('artist');
    if (redisArtist && redisArtist !== 'null') {
      return {
        message: 'success',
        data: JSON.parse(redisArtist),
      };
    }

    const artist = await this.artistModel.findByPk(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    await this.redis.set('user', JSON.stringify(redisArtist), 600);

    return {
      message: 'success',
      data: artist,
    };
  }

  async update(id: number, dto: UpdateArtistDto): Promise<Artist> {
    const { data: artist } = await this.findOne(id);
    await artist.update(dto);
    return artist;
  }

  async remove(id: number): Promise<void> {
    const { data: artist } = await this.findOne(id);
    await artist.destroy();
  }
}

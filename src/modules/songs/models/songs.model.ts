import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Like } from 'src/modules/likes/models/likes-model';
import { Playlist } from 'src/modules/playlist/models/playlist.model';

interface SongCreationAttrs {
  title: string;
  genre?: string;
  audioUrl?: string;
  coverImage?: string;
  playlistId?: number;
}

@Table({ tableName: 'songs', timestamps: true })
export class Song extends Model<Song, SongCreationAttrs> {
  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare genre: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare audioUrl: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare coverImage: string;

  @ForeignKey(() => Playlist)
  @Column(DataType.INTEGER)
  declare playlistId: number;

  @BelongsTo(() => Playlist)
  declare playlist: Playlist;

  @HasMany(() => Like)
  declare likes: Like[];
}

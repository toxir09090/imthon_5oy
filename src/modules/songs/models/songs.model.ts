import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Artist } from 'src/modules/artist';

interface SongCreationAttrs {
  title: string;
  genre?: string;
  audioUrl?: string;
  coverImage?: string;
  artistId: number;
}

@Table({ tableName: 'songs', timestamps: true })
export class Song extends Model<Song, SongCreationAttrs> {
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  @Column({ type: DataType.STRING, allowNull: true })
  genre?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  audioUrl?: string;

  @Column({ type: DataType.STRING, allowNull: true })
  coverImage?: string;

  @ForeignKey(() => Artist)
  @Column({ type: DataType.INTEGER, allowNull: false })
  artistId: number;
}

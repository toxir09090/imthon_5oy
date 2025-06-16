import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Users } from '../../users/models/user.model'; // Foydalanuvchi modeliga yo‘lni moslang
import { Artist } from 'src/modules/artist/models/artist.model';
import { Song } from 'src/modules/songs/models/songs.model';

export interface PlaylistCreationAttrs {
  name: string;
  description?: string;
  artistId: number;
}

@Table({ tableName: 'playlists', timestamps: true })
export class Playlist extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description?: string;

  @ForeignKey(() => Artist)
  @Column(DataType.INTEGER)
  artistId: number;

  @BelongsTo(() => Artist)
  artist: Artist;

  @HasMany(() => Song)
  songs: Song[];
}
 
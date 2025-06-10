import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Users } from '../../users/models/user.model'; // Foydalanuvchi modeliga yo‘lni moslang
import { Artist } from 'src/modules/artist';

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

  @ForeignKey(() => Users)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @ForeignKey(() => Artist)
  @Column({ type: DataType.INTEGER, allowNull: false })
  artistId: number;

  @BelongsTo(() => Artist)
  artist: Artist;
}

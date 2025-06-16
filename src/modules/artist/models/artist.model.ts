import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Playlist } from 'src/modules/playlist/models/playlist.model';
import { Users } from 'src/modules/users/models/user.model';

@Table({ tableName: 'artists', timestamps: true })
export class Artist extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  genre?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imageUrl?: string;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId: number;

  @BelongsTo(() => Users)
  user: Users;

  @HasMany(() => Playlist)
  playlists: Playlist[];
}

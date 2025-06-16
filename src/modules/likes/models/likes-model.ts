import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Song } from 'src/modules/songs/models/songs.model';
import { Users } from 'src/modules/users';
// import { Users } from 'src/modules/users/models/user.model';

@Table({ tableName: 'likes', timestamps: true })
export class Like extends Model {
  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId: number;

  @ForeignKey(() => Song)
  @Column(DataType.INTEGER)
  song_id: number;

  @BelongsTo(() => Users)
  user: Users;

  @BelongsTo(() => Song) 
  song: Song;
}

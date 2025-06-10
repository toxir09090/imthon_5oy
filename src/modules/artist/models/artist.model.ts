import { Column, Model, Table, DataType, HasMany } from 'sequelize-typescript';
import { Playlist } from 'src/modules/playlist';

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

  @HasMany(()=>Playlist)
  playlists:Playlist[]
}

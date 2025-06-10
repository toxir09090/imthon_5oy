import { Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Song } from 'src/modules/songs';

@Table({ tableName: 'like', timestamps: true })
export class Like extends Model {
  @ForeignKey(() => Song)
  @Column({ type: DataType.INTEGER, allowNull: false })
  song_id: string;
}

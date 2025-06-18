import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UserRoles } from 'src/enum/roles.enum';
import { Artist } from 'src/modules/artist/models/artist.model';
import { Like } from 'src/modules/likes/models/likes-model';

@Table({ tableName: 'users', timestamps: true })
export class Users extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(UserRoles),
    defaultValue: UserRoles.USER,
  })
  role: UserRoles;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;
  @Column({
    type: DataType.STRING,
  })
  token:string
  @HasMany(() => Artist)
  artists: Artist[];

  @HasMany(() => Like)
  likes: Like[];
}

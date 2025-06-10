import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { UserRoles } from 'src/enum/roles.enum';

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
}

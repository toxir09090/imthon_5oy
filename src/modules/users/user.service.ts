import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { Users } from './models';
import { CreateUserDto, LoginUserDto } from './dtos';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/sequelize';
import { JwtHelper } from 'src/helpers/jwt.helper';
import { UserRoles } from 'src/enum/roles.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
    private jwtHelper: JwtHelper,
  ) {}

  async login(payload: LoginUserDto) {
    let foundedUser: any = await this.userModel.findOne({
      where: { email: payload.email },
    });
    foundedUser = foundedUser?.toJSON();
    if (!foundedUser) throw new ConflictException('Foydalanuvchi topilmadi!');

    const isMatch = await bcrypt.compare(
      payload.password,
      foundedUser.password,
    ); 
    if (!isMatch) throw new BadRequestException('Password xato!');

    const tokens = await this.jwtHelper.generateTokens({
      id: foundedUser.id,
      role: foundedUser.role,
    });

    return {
      message: 'Successfully logged in!',
      ...tokens,
      data: foundedUser,
    };
  }

  async register(payload: CreateUserDto): Promise<Users> {
    const existing = await this.userModel.findOne({
      where: { email: payload.email },
    });
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await this.userModel.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
    });

    return user;
  }

  async registerByArtist(payload: CreateUserDto): Promise<Users> {
    const existing = await this.userModel.findOne({
      where: { email: payload.email },
    });
    if (existing) throw new ConflictException('Email already registered');

    const hashedPassword = await bcrypt.hash(payload.password, 10);

    const user = await this.userModel.create({
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: UserRoles.ARTIST,
    });

    return user;
  }

  async findById(id: number) {
    return await this.userModel.findByPk(id);
  }
}

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

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users)
    private userModel: typeof Users,
    private jwtHelper: JwtHelper,
  ) {}

  async login(payload: LoginUserDto) {
    const foundedUser = (
      await this.userModel.findOne({ where: { email: payload.email } })
    )?.dataValues;

    if (!foundedUser) {
      throw new ConflictException('Foydalanuvchi topilmadi!');
    }

    let isMatch = await bcrypt.compare(payload.password, foundedUser.password);

    if (!isMatch) {
      throw new BadRequestException('Password xato!');
    }

    const { token } = await this.jwtHelper.generateToken({
      id: foundedUser.id,
      role: foundedUser.role,
    });
    
    return {
      message: 'Successfully logged!',
      token,
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
}

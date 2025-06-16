import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Users } from './models';
import { JwtModule } from '@nestjs/jwt';
import { JwtHelper } from 'src/helpers/jwt.helper';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategy';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forFeature([Users]),
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: {
        expiresIn: process.env.ACCESS_TOKEN_TIME
          ? parseInt(process.env.ACCESS_TOKEN_TIME)
          : '1h',
      },
    }),
  ],
  providers: [UserService, JwtHelper,GoogleStrategy],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}

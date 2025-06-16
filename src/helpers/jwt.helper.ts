import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { UserRoles } from 'src/enum/roles.enum';

@Injectable()
export class JwtHelper {
  constructor(private jwt: JwtService) {}

  async generateTokens(payload: { id: number; role: UserRoles }) {
    const accessToken = await this.jwt.signAsync(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: process.env.ACCESS_TOKEN_TIME || '1h',
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_TIME || '7d',
    });

    return { accessToken, refreshToken };
  }

  async verifyAccessToken(token: string) {
    try {
      return await this.jwt.verifyAsync(token, {
        secret: process.env.ACCESS_TOKEN_SECRET,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('Access token expired!');
      }

      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('Invalid access token!');
      }

      throw new InternalServerErrorException('Token verification failed!');
    }
  }

  async verifyRefreshToken(token: string) {
    try {
      return await this.jwt.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new ForbiddenException('Refresh token expired!');
      }

      if (error instanceof JsonWebTokenError) {
        throw new BadRequestException('Invalid refresh token!');
      }

      throw new InternalServerErrorException('Token verification failed!');
    }
  }
}

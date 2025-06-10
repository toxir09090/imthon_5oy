import {
  CanActivate,
  ConflictException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PROTECTED_KEY } from 'src/decorators/protected.decorator';
import { UserRoles } from 'src/enum/roles.enum';
import { JwtHelper } from 'src/helpers/jwt.helper';

@Injectable()
export class ProtectedGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwt: JwtHelper,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isProtected = this.reflector.getAllAndOverride<boolean>(
      PROTECTED_KEY,
      [context.getHandler(), context.getClass()],
    );

    const request: Request & { id?: number; role?: string } = context
      .switchToHttp()
      .getRequest<Request>();

    if (!isProtected) {
      request.role = UserRoles.USER;
      return true;
    }

    const token = request.headers.authorization;
    if (!token || !token.startsWith('Bearer ')) {
      throw new ConflictException('Bearer token berilmadi');
    }

    const decoded = await this.jwt.verifyToken(token.split(' ')[1]);
    request.id = decoded.id;
    request.role = decoded.role;

    return true;
  }
}

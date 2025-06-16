import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dtos';
import { Protected } from 'src/decorators/protected.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { UserRoles } from 'src/enum/roles.enum';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async google() {}

  @Get('/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: any) {
    return req.user;
  }

  @Post('register')
  @Protected(false)
  @Roles([UserRoles.ADMIN, UserRoles.USER, UserRoles.ARTIST])
  async register(@Body() payload: CreateUserDto) {
    return await this.userService.register(payload);
  }

  @Post('registerByArtist')
  @Protected(false)
  @Roles([UserRoles.ARTIST])
  async registerByArtist(@Body() payload: CreateUserDto) {
    return await this.userService.registerByArtist(payload);
  }

  @Post('login')
  @Protected(false)
  @Roles([UserRoles.ADMIN, UserRoles.USER, UserRoles.ARTIST])
  async login(@Body() payload: LoginUserDto) {
    return await this.userService.login(payload);
  }
}

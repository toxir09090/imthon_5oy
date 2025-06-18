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
import { CreateUserDto, ForgotDto, LoginUserDto } from './dtos';
import { Protected } from 'src/decorators/protected.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { UserRoles } from 'src/enum/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { EmailService } from '../mail/mail.service';
import { ApiBody } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private e: EmailService,
  ) {}

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
  @Post('email')
  @Protected(false)
  @Roles([UserRoles.ADMIN, UserRoles.USER, UserRoles.ARTIST])
  async email(@Body() body: ForgotDto) {
    return await this.e.sendMail(body.email);
  }
  @Post('forgot')
  @Protected(false)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        token: { type: 'string', example: 'jwt.token.here' },
        newPassword: { type: 'string', example: 'toxir333' },
      },
      required: ['token', 'newPassword'],
    },
  })
  @Roles([UserRoles.ADMIN, UserRoles.USER, UserRoles.ARTIST])
  async forgot(@Body() body: { token: string; newPassword: string }) {
    return await this.userService.fogotPassword(body.token, body.newPassword);
  }
}

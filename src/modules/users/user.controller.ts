import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dtos';
import { Users } from './models';
import { Protected } from 'src/decorators/protected.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { UserRoles } from 'src/enum/roles.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

    @Post('register')
    @Protected(false)
    @Roles([UserRoles.ADMIN, UserRoles.USER])
    async register(@Body() payload:CreateUserDto){
        return await this.userService.register(payload)
    }

    @Post('login')
    @Protected(false)
    @Roles([UserRoles.ADMIN, UserRoles.USER])
    async login(@Body() payload:LoginUserDto){
        return await this.userService.login(payload)
    }
}

import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UserModule, Users, UserService } from '../users';
import { SequelizeModule } from '@nestjs/sequelize';
@Module({
  imports: [UserModule,SequelizeModule.forFeature([Users])],
  providers: [SeedService],
})
export class SeedModule {}

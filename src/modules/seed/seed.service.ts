import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { Users } from '../users';
 
@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(@InjectModel(Users) private readonly userModel: typeof Users) {}

  async onModuleInit() {
    const existingAdmin = await this.userModel.findOne({
      where: { email: 'toxir@gmail.com' },
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('toxir123', 10);

      await this.userModel.create({
        name: 'Toxir',
        email: 'toxir@gmail.com',
        password: hashedPassword,
        role: 'ADMIN',
      });

      this.logger.log('Admin user created✅');
    } else {
      this.logger.log('Admin user already exists❌');
    }
  }
}

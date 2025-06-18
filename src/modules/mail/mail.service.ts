import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { Users } from '../users';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class EmailService {
  constructor(@InjectModel(Users) private us:typeof Users,private readonly mailerService: MailerService) {}

  async sendMail(toEmail:string) {
    try {
        const findUser = await this.us.findOne({
            where:{email:toEmail}
        });
        if(!findUser) {
            throw new NotFoundException("user topilmadi")
        }
         await this.mailerService.sendMail({
          to: toEmail,
          from:"toxirturopov578@gmail.com",
          subject: 'forgot',
          text: 'Hello world!',
          html: findUser.dataValues.token,
        });
        return "email tekshiring";
    } catch (error) {
        throw new BadRequestException(error.message)   
    }
  }
}

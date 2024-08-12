import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async send(body: CreateMailDto) {
    const { to, from, subject, text } = body;
    try {
      const response = await this.mailerService.sendMail({
        from,
        to,
        subject,
        html: '<p>test</p>',
      });
      console.log('Res:', response);
      return { success: true };
    } catch (e) {
      console.log('Error:', e);
      return { success: false };
    }
  }
}

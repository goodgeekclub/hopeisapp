import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { DiscordService } from 'src/discord.service';
import { from } from 'rxjs';
import { ConfigService } from '@nestjs/config';

export interface ApproveTemplateContext {
  name: string;
  coin: number;
  imgUrl: string;
}

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private discordService: DiscordService,
    private configService: ConfigService,
  ) {}

  async send(body: CreateMailDto) {
    const { to, from, subject } = body;
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

  async sendTemplate() {
    const to = 'kizzaraiva@gmail.com';
    const profileUrl = 'https://hopeis.us';
    const name = 'Araiva';
    const coin = 20;
    try {
      const response = await this.mailerService.sendMail({
        to,
        subject: 'Welcome to Nice App! Confirm your Email',
        template: './approve',
        context: {
          name,
          coin,
          profileUrl,
          imgUrl: '',
        },
      });
      console.log('Res:', response);
      return { success: true };
    } catch (e) {
      console.log('Error:', e);
      return { success: false };
    }
  }

  async sendProveTemplate(
    to: string,
    template: string,
    context: ApproveTemplateContext,
  ) {
    const profileUrl = `${this.configService.get('FRONTEND_URL')}/mission`;
    const msg =
      template === 'approve'
        ? 'มิชชั่นของคุณสำเร็จแล้ว!'
        : 'มิชชั่นของคุณไม่สำเร็จ';
    try {
      const response = await this.mailerService.sendMail({
        to,
        subject: `${context.name} ${msg}!`,
        template,
        context: {
          ...context,
          profileUrl,
        },
      });
      // console.log('Res:', response);
      return { success: true };
    } catch (e) {
      console.log('Error:', e);
      from(
        this.discordService.error('SendApproveError:', {
          name: e.name,
          message: e.message,
          stack: e.stack,
          error: e.toString(),
        }),
      );
      return { success: false };
    }
  }
}

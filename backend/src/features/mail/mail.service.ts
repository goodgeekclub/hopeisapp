import { Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { DiscordService } from 'src/discord.service';
import { firstValueFrom, from } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import e from 'express';

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
  ) { }

  async send(body: CreateMailDto) {
    const { to, from, subject } = body;
    try {
      const response = await this.mailerService.sendMail({
        from,
        to,
        subject,
        html: '<p>test</p>',
      });
      // console.log('Res:', response);
      return { success: true };
    } catch (e) {
      console.log('Error:', e);
      return { success: false };
    }
  }

  async sendProveTemplate(
    to: string,
    template: string,
    ctx: ApproveTemplateContext,
  ) {
    let subject;
    let html;
    if (template === 'approve') {
      subject = `${ctx.name} มิชชั่นของคุณสำเร็จแล้ว!`;
      html = this.approveTemplate(ctx);
    } else {
      subject = `${ctx.name} มิชชั่นของคุณไม่สำเร็จ`;
      html = this.approveTemplate(ctx);
    }
    try {
      console.log('try Email:', ctx);
      const response = await this.mailerService.sendMail({
        to,
        subject,
        // html,
        template,
        context: {
          ...ctx,
          profileUrl: `${this.configService.get('FRONTEND_URL')}/mission`,
        },
      });
      console.log('Res:', response);
      return { success: true };
    } catch (e) {
      console.log('Error:', e);
      await firstValueFrom(
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

  approveTemplate(ctx: ApproveTemplateContext) {
    const profileUrl = `${this.configService.get('FRONTEND_URL')}/mission`;
    return `
      <style>
          a:hover {
              cursor: pointer
          }
      </style>

      <body>
          <h3>สวัสดี ${ctx.name},</h3>
          <h4>Mission Completed</h4>
          <p>มิชชั่นของคุณสำเร็จแล้ว ขณะนี้ คุถที coin สะสมทั้งหมด ${ctx.coin} coin สามารถเริ่มทำมิชชั่นใหม่ในวันถัดไป</p>
          <img src="${ctx.imgUrl}" alt="mission-image">

          <div style="margin-top: 8px;">
              <a href="${profileUrl}">
                  <button
                      style="background-color: #2C58A1; color: white; padding: 8px 24px; border-radius: 8px; border-width: 0;">ดูโปรไฟล์</button>
              </a>
          </div>
      </body>
    `;
  }
}

import { DateTime } from 'luxon';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DiscordService {
  constructor(
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  public notify(title: string, data: any) {
    const url = this.configService.get('DISCORD_TRACK');
    if (!url) {
      throw new Error('DISCORD_TRACK url is empty');
    }
    const payload = {
      content: null,
      embeds: [
        {
          title,
          description: '```json\n' + JSON.stringify(data, null, 2) + '\n```',
          color: 16750848,
          footer: {
            text: this.configService.get('ENV') || 'Local',
          },
          timestamp: DateTime.now().toISO(),
        },
      ],
    };
    return this.httpService.post(url, payload);
  }

  public error(title: string, data: any) {
    const url = this.configService.get('DISCORD_TRACK');
    if (!url) {
      throw new Error('DISCORD_TRACK url is empty');
    }
    const payload = {
      embeds: [
        {
          title,
          description:
            '```diff\n- ERROR -```' +
            '```json\n' +
            JSON.stringify(data, null, 2) +
            '\n```',
          color: 13969770,
          footer: {
            text: this.configService.get('ENV') || 'Local',
          },
          timestamp: DateTime.now().toISO(),
        },
      ],
    };
    return this.httpService.post(url, payload);
  }
}

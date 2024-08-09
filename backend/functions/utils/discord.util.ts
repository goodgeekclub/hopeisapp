import axios from 'axios';
import { DateTime } from 'luxon';

export class DiscordService {
  static notify(title: string, data: any) {
    if (!process.env.DISCORD_TRACK) {
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
            text: 'Timestamp',
          },
          timestamp: DateTime.now().toISO(),
        },
      ],
    };
    return axios.post(process.env.DISCORD_TRACK, payload);
  }

  static error(title: string, data: any) {
    if (!process.env.DISCORD_TRACK) {
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
            text: 'Timestamp',
          },
          timestamp: DateTime.now().toISO(),
        },
      ],
    };
    return axios.post(process.env.DISCORD_TRACK, payload);
  }
}

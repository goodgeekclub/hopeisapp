import { Context, Handler } from 'aws-lambda';
import { connect, createModels } from './utils/mongoose.util';
import { Mongoose } from 'mongoose';
import { DataService } from './services/data.service';
import { DiscordService } from './utils/discord.util';

let conn: Mongoose;

export const handler: Handler = async (event: any, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    conn = await connect(conn);
    createModels(conn);
    const dataService = new DataService(conn);
    const stats = await dataService.saveStats();
    console.log(stats);
    await DiscordService.notify('Stats', stats.data);
    throw new Error('Testing Error');
  } catch (e) {
    console.error(e);
    await DiscordService.error('CronStatsError', {
      name: e.name,
      message: e.message,
      stack: e.stack,
      error: e.toString(),
    });
  }
  return;
};

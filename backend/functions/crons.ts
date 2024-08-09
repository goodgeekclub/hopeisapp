import { Context, Handler } from 'aws-lambda';
import { connect, createModels } from './utils/mongoose.util';
import { Mongoose } from 'mongoose';
import { DataService } from './services/data.service';
import { DiscordService } from './utils/discord.util';
import { ActivityService } from './services/activity.service';

let conn: Mongoose;

export const stats: Handler = async (event: any, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    conn = await connect(conn);
    createModels(conn);
    const dataService = new DataService(conn);
    const stats = await dataService.saveStats();
    console.log(stats);
    await DiscordService.notify('Stats', stats.data);
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

export const clearActivities: Handler = async (event: any, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    conn = await connect(conn);
    createModels(conn);
    const activityService = new ActivityService(conn);
    const active = await activityService.listActive();
    console.log('Total Active Activity:', active.length);
    const expiredOpt = await activityService.setExpired();
    await DiscordService.notify('Stats', expiredOpt);
  } catch (e) {
    console.error(e);
    await DiscordService.error('CronClearActivitiesError', {
      name: e.name,
      message: e.message,
      stack: e.stack,
      error: e.toString(),
    });
  }
  return;
}
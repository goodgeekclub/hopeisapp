import { Context, Handler } from 'aws-lambda';
import { connect, createModels } from './mongoose.config';
import { Mongoose } from 'mongoose';
import { DataService } from './services/data.service';

let conn: Mongoose;

export const handler: Handler = async (event: any, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  try {
    conn = await connect(conn);
    createModels(conn);
    const dataService = new DataService(conn);
    await dataService.saveStats();
  } catch (e) {
    console.error(e);
  }
  return;
};

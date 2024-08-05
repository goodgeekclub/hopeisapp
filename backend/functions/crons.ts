import { Context, Handler } from 'aws-lambda';
import { connect } from './mongoose.config';
import { Mongoose } from 'mongoose';
import { COLLECTION_NAME } from 'src/configs/mongoose.config';

let conn: Mongoose;

export const handler: Handler = async (event: any, context: Context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  conn = await connect(conn);
  // console.log('event:', event);
  // console.log('context:', context);
  const dataCollection = conn.connection.db.collection(COLLECTION_NAME.DATA);
  console.log('collections:', conn.connection.collections);
  console.log('listDatabases:', await conn.connection.listDatabases());
  console.log('listCollections:', await conn.connection.listCollections());
  console.log(await dataCollection.find().toArray());
  return;
};

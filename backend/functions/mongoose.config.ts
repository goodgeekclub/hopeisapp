import mongoose, { Mongoose } from 'mongoose';
const uri = process.env.MONGODB_CONNECTION_STRING;
console.log('uri:', uri);
export const connect = async (
  conn?: Promise<Mongoose> | Mongoose,
): Promise<Mongoose> => {
  if (conn == null) {
    conn = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 5000,
      })
      .then(() => mongoose);
    await conn;
  }
  return conn;
};

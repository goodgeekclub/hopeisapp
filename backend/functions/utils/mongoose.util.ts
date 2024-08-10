import mongoose, { Mongoose } from 'mongoose';
const uri = process.env.MONGODB_CONNECTION_STRING || '';

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

export const createModels = (conn: Mongoose) => {
  return {
    data:
      conn.models.data ||
      conn.model('data', new conn.Schema({}, { strict: false }), 'datasets'),
    profile:
      conn.models.profiles ||
      conn.model(
        'profiles',
        new conn.Schema({}, { strict: false }),
        'profiles',
      ),
    activities:
      conn.models.activities ||
      conn.model(
        'activities',
        new conn.Schema({}, { strict: false }),
        'profile-activities',
      ),
    results:
      conn.models.results ||
      conn.model(
        'results',
        new conn.Schema({}, { strict: false }),
        'quiz-results',
      ),
  };
};

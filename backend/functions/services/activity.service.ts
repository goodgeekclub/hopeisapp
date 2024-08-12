import { DateTime } from 'luxon';
import { Model, Mongoose } from 'mongoose';

export enum ActivityStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

export class ActivityService {
  private model: Model<any>;
  private conn: Mongoose;

  constructor(conn: Mongoose) {
    this.model = conn.models.activities;
    this.conn = conn;
  }

  async listActive(status?: ActivityStatus) {
    console.log(DateTime.utc().toISO());
    return this.model.find({
      status: {
        $in: ['DOING', 'PENDING'],
      },
      createdAt: {
        $lte: DateTime.utc().toJSDate(),
      },
    });
  }

  async setExpired() {
    return this.model.updateMany(
      {
        status: {
          $in: [ActivityStatus.DOING, ActivityStatus.PENDING],
        },
        createdAt: {
          $lte: DateTime.utc().toJSDate(),
        },
      },
      {
        status: ActivityStatus.FAILED,
      },
    );
  }
}

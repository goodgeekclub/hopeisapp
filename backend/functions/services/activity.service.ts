import { stats } from './../crons';
import { Model, Mongoose } from "mongoose";
import { ActivityStatus } from "src/schemas/profile-activity.schema";

export class ActivityService {
  private model: Model<any>;
  private conn: Mongoose;

  constructor(conn: Mongoose) {
    this.model = conn.models.activities;
    this.conn = conn;
  }

  async list(status?: ActivityStatus) {
    return this.model.find({
      status
    })
  }
}
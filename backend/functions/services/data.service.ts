import { Model, Mongoose } from 'mongoose';

export interface StatsData {
  name: string;
  description?: string;
  type: 'STAT';
  data: {
    totalResult: number;
    totalCoin: number;
    totalFinisher: number;
    totalBudget: number;
  };
}

export class DataService {
  private model: Model<StatsData>;
  private conn: Mongoose;

  constructor(conn: Mongoose) {
    this.model = conn.models.data;
    this.conn = conn;
  }

  async saveStats() {
    const stats = await this.getStats();
    stats.data = {
      totalResult: await this.getTotalResult(),
      totalFinisher: await this.getTotalFinisher(),
      totalCoin: await this.geTotalCoin(),
      totalBudget: 0,
    };
    return stats.save();
  }

  async getStats() {
    return this.model.findOne({ type: 'STAT' }).then((stats) => {
      return stats || new this.model(this.defaultStats());
    });
  }

  getTotalResult() {
    return this.conn.models.results.countDocuments({});
  }

  getTotalFinisher() {
    return this.conn.models.activities.countDocuments({
      coinValue: { $gt: 0 },
      status: 'SUCCESS',
    });
  }

  async geTotalCoin() {
    const data = await this.conn.models.activities
      .aggregate([
        {
          $project: {
            coinValue: 1,
            status: 1,
          },
        },
        {
          $match: {
            coinValue: { $gt: 0 },
            status: 'SUCCESS',
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: '$coinValue',
            },
          },
        },
      ])
      .exec();
    return data[0].total;
  }

  defaultStats(): StatsData {
    return {
      name: 'Statistics',
      description: 'Application statistics',
      type: 'STAT',
      data: {
        totalResult: 0,
        totalCoin: 0,
        totalFinisher: 0,
        totalBudget: 0,
      },
    };
  }
}

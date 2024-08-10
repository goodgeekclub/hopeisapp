import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService {
  constructor(@InjectConnection() private connection: Connection) {}
  getHello(): string {
    return 'Hello World!';
  }

  getCollections() {
    return this.connection.listCollections();
  }

  getDabase() {
    return this.connection.db.databaseName
  }
}

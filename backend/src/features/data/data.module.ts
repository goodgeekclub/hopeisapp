import { Module } from '@nestjs/common';
import { DataService } from './data.service';
import { DataController } from './data.controller';
import { mongooseConnection } from 'src/configs/mongoose.config';

@Module({
  imports: [mongooseConnection.dataset],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}

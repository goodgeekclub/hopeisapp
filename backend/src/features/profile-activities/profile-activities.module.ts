import { Module } from '@nestjs/common';
import { ProfileActivitiesService } from './profile-activities.service';
import { ProfileActivitiesController } from './profile-activities.controller';
import { mongooseConnection } from 'src/configs/mongoose.config';

@Module({
  imports: [mongooseConnection.profileActivities],
  controllers: [ProfileActivitiesController],
  providers: [ProfileActivitiesService],
})
export class ProfileActivitiesModule {}

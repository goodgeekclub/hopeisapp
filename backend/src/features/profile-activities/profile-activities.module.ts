import { Module } from '@nestjs/common';
import { ProfileActivitiesService } from './profile-activities.service';
import { ProfileActivitiesController } from './profile-activities.controller';

@Module({
  controllers: [ProfileActivitiesController],
  providers: [ProfileActivitiesService],
})
export class ProfileActivitiesModule {}

import { Module } from '@nestjs/common';
import { ProfileActivitiesService } from './profile-activities.service';
import { ProfileActivitiesController } from './profile-activities.controller';
import { mongooseConnection } from 'src/configs/mongoose.config';
import { ProfilesModule } from '../profiles/profiles.module';
import { DataModule } from '../data/data.module';

@Module({
  imports: [mongooseConnection.profileActivities, ProfilesModule, DataModule],
  controllers: [ProfileActivitiesController],
  providers: [ProfileActivitiesService],
  exports: [
    ProfileActivitiesService
  ]
})
export class ProfileActivitiesModule {}

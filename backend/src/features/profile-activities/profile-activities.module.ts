import { Module } from '@nestjs/common';
import { ProfileActivitiesService } from './profile-activities.service';
import { ProfileActivitiesController } from './profile-activities.controller';
import { mongooseConnection } from 'src/configs/mongoose.config';
import { ProfilesModule } from '../profiles/profiles.module';

@Module({
  imports: [mongooseConnection.profileActivities, ProfilesModule],
  controllers: [ProfileActivitiesController],
  providers: [ProfileActivitiesService],
})
export class ProfileActivitiesModule {}

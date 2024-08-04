import { Module } from '@nestjs/common';
import { MeController } from './me.controller';
import { MeService } from './me.service';
import { ProfilesModule } from '../profiles/profiles.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProfileActivitiesModule } from '../profile-activities/profile-activities.module';
import { QuizResultsModule } from '../quiz-results/quiz-results.module';
import { DataModule } from '../data/data.module';

@Module({
  imports: [
    AuthModule,
    ProfilesModule,
    ProfileActivitiesModule,
    QuizResultsModule,
    DataModule,
  ],
  controllers: [MeController],
  providers: [MeService],
})
export class MeModule {}

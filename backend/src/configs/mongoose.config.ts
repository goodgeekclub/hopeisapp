import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileSchema } from 'src/schemas/profile.schema';
import { DataSchema } from 'src/schemas/data.schema';
import { QuizResultSchema } from 'src/schemas/quiz-result.schema';
import { ProfileActivitySchema } from 'src/schemas/profile-activity.schema';

export const COLLECTION_NAME = {
  QUIZ: 'quizes',
  PROFILE: 'profiles',
  DATA: 'dataset',
  QUIZ_RESULT: 'quiz-results',
  PROFILE_ACTIVITIES: 'profile-activities',
};

export const mongooseConnection = {
  root: MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get('MONGODB_CONNECTION_STRING'),
    }),
    inject: [ConfigService],
  }),
  profiles: MongooseModule.forFeature([
    { name: COLLECTION_NAME.PROFILE, schema: ProfileSchema },
  ]),
  quizResults: MongooseModule.forFeature([
    { name: COLLECTION_NAME.QUIZ_RESULT, schema: QuizResultSchema },
  ]),
  dataset: MongooseModule.forFeature([
    { name: COLLECTION_NAME.DATA, schema: DataSchema },
  ]),
  profileActivities: MongooseModule.forFeature([
    { name: COLLECTION_NAME.PROFILE_ACTIVITIES, schema: ProfileActivitySchema },
  ]),
};

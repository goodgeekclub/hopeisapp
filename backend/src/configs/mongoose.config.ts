import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProfileSchema } from 'src/schemas/profile.schema';
import { DataSchema } from 'src/schemas/data.schema';
import { QuizResult } from 'src/schemas/quiz-reult.schema';

export const COLLECTION_NAME = {
  QUIZ: 'quizes',
  PROFILE: 'profiles',
  DATA: 'dataset',
  QUIZ_RESULT: 'quiz-results'
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
    { name: COLLECTION_NAME.QUIZ_RESULT, schema: QuizResult },
  ]),
  dataset: MongooseModule.forFeature([
    { name: COLLECTION_NAME.DATA, schema: DataSchema },
  ]),
};

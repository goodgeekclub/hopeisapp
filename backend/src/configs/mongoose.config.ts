import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QuizSchema } from 'src/schemas/quiz.schema';

export const COLLECTION_NAME = {
  QUIZ: 'quizes',
};


export const mongooseConnection = {
  root: MongooseModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get('MONGODB_CONNECTION_STRING'),
    }),
    inject: [ConfigService],
  }),
  quizes: MongooseModule.forFeature([
    { name: COLLECTION_NAME.QUIZ, schema: QuizSchema }
  ])
}
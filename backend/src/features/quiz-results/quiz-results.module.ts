import { Module } from '@nestjs/common';
import { QuizResultsService } from './quiz-results.service';
import { QuizResultsController } from './quiz-results.controller';
import { mongooseConnection } from 'src/configs/mongoose.config';
import { ProfilesModule } from '../profiles/profiles.module';

@Module({
  imports: [mongooseConnection.quizResults, ProfilesModule],
  controllers: [QuizResultsController],
  providers: [QuizResultsService],
  exports: [QuizResultsService],
})
export class QuizResultsModule {}

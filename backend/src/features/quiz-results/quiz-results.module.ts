import { Module } from '@nestjs/common';
import { QuizResultsService } from './quiz-results.service';
import { QuizResultsController } from './quiz-results.controller';
import { mongooseConnection } from 'src/configs/mongoose.config';

@Module({
  imports: [mongooseConnection.quizResults],
  controllers: [QuizResultsController],
  providers: [QuizResultsService],
})
export class QuizResultsModule {}

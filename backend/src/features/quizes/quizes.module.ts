import { Module } from '@nestjs/common';
import { mongooseConnection } from 'src/configs/mongoose.config';
import { QuizesController } from './quizes.controller';
import { QuizesService } from './quizes.service';

@Module({
  imports: [ mongooseConnection.quizes ],
  controllers: [QuizesController],
  providers: [QuizesService]
})
export class QuizesModule {}

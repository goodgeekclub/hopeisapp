import { Injectable } from '@nestjs/common';
import { CreateQuizResultDto } from './dto/create-quiz-result.dto';
import { UpdateQuizResultDto } from './dto/update-quiz-result.dto';
import { InjectModel } from '@nestjs/mongoose';
import { COLLECTION_NAME } from 'src/configs/mongoose.config';
import { Model } from 'mongoose';
import { QuizResult } from 'src/schemas/quiz-reult.schema';
import { from } from 'rxjs';

@Injectable()
export class QuizResultsService {
  constructor(
    @InjectModel(COLLECTION_NAME.QUIZ_RESULT) private model: Model<QuizResult>
  ) {}
  create(createQuizResultDto: CreateQuizResultDto) {
    const quizResult = new this.model(createQuizResultDto);
    return from(quizResult.save());
  }

  findAll() {
    return this.model.find().exec();
  }

  findOne(id: number) {
    return this.model.findById(id);
  }

  update(id: number, updateQuizResultDto: UpdateQuizResultDto) {
    return from(this.model.findByIdAndUpdate(id, updateQuizResultDto));
  }

  remove(id: number) {
    return from(this.model.findByIdAndDelete(id));
  }
}

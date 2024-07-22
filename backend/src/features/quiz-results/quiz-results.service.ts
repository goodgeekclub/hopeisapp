import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizResultDto } from './dto/create-quiz-result.dto';
import { UpdateQuizResultDto } from './dto/update-quiz-result.dto';
import { InjectModel } from '@nestjs/mongoose';
import { COLLECTION_NAME } from 'src/configs/mongoose.config';
import { Model } from 'mongoose';
import { QuizResult } from 'src/schemas/quiz-result.schema';
import { from } from 'rxjs';
import { QueryOptionsDto } from 'src/dto/query-options.dto';

@Injectable()
export class QuizResultsService {
  constructor(
    @InjectModel(COLLECTION_NAME.QUIZ_RESULT) private model: Model<QuizResult>
  ) {}
  create(createQuizResultDto: CreateQuizResultDto) {
    // const quizResult = new this.model(createQuizResultDto);
    const quizResult = new this.model(createQuizResultDto);
    return from(quizResult.save());
  }

  findAll(options?: QueryOptionsDto) {
    const find = this.model.find();
    find.limit(options.limit);
    find.skip(options.skip);
    find.sort({ createdAt: 'asc' })
    return this.model.find().exec();
  }

  findOne(id: string) {
    return this.model.findById(id).populate('profile').then(profile => {
      if (!profile) {
        throw new NotFoundException('Profile does not existed');
      }
    });
  }
}

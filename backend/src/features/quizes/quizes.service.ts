import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { COLLECTION_NAME } from 'src/configs/mongoose.config';
import { Quiz } from 'src/schemas/quiz.schema';

@Injectable()
export class QuizesService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(COLLECTION_NAME.QUIZ) private model: Model<Quiz>
  ) {}

  list() {
    return this.model.find().exec();
  }
}

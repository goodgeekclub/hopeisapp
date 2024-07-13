import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { COLLECTION_NAME } from 'src/configs/mongoose.config';
import { Quiz } from 'src/schemas/quiz.schema';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizesService {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(COLLECTION_NAME.QUIZ) private model: Model<Quiz>
  ) {}

  list() {
    return this.model.find().exec();
  }

  get(id: string) {
    return this.model.findById(id);
  }

  create(data: CreateQuizDto) {
    const quiz = new this.model(data)
    return quiz.save();
  }

  update(id: string, data: UpdateQuizDto) {
    return this.model.updateOne({ _id: id }, data).then((_) => this.get(id));
  }
}

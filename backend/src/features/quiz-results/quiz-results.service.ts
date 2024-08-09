import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuizResultDto } from './dto/create-quiz-result.dto';
import { InjectModel } from '@nestjs/mongoose';
import { COLLECTION_NAME } from 'src/configs/mongoose.config';
import { Model } from 'mongoose';
import { QuizResult } from 'src/schemas/quiz-result.schema';
import { from } from 'rxjs';
import { QueryOptionsDto } from 'src/dto/query-options.dto';
import { ProfilesService } from '../profiles/profiles.service';

@Injectable()
export class QuizResultsService {
  constructor(
    @InjectModel(COLLECTION_NAME.QUIZ_RESULT) private model: Model<QuizResult>,
    private profileService: ProfilesService,
  ) {}
  async create(body: CreateQuizResultDto) {
    const quizResult = new this.model(body);
    if (body.profileId) {
      const profile = await this.profileService.findOne(body.profileId);
      if (!profile) {
        throw new BadRequestException('QuizResult does not existed');
      }
    }
    return from(quizResult.save());
  }

  findAll(options?: QueryOptionsDto) {
    const find = this.model.find();
    find.limit(options?.limit);
    find.skip(options?.skip);
    find.sort({ createdAt: 'asc' });
    return this.model.find().exec();
  }

  findOne(id: string) {
    return this.model.findById(id).populate('profile');
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { QuizResultsService } from './quiz-results.service';
import { CreateQuizResultDto } from './dto/create-quiz-result.dto';
import { QueryOptions } from 'src/decorators/query-options.decorator';
import { QueryOptionsDto } from 'src/dto/query-options.dto';
import { AuthRole, Public } from 'src/auth/auth.guard';
import { Auth } from 'src/decorators/auth.docorator';

@Auth(AuthRole.Admin)
@Controller('quiz-results')
export class QuizResultsController {
  constructor(private readonly quizResultsService: QuizResultsService) {}

  @Public()
  @Post()
  create(@Body() createQuizResultDto: CreateQuizResultDto) {
    return this.quizResultsService.create(createQuizResultDto);
  }

  @Get()
  findAll(@QueryOptions() options: QueryOptionsDto) {
    return this.quizResultsService.findAll(options);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizResultsService.findOne(id).then((profile) => {
      if (!profile) {
        throw new NotFoundException('QuizResult does not existed');
      }
      return profile;
    });
  }
}

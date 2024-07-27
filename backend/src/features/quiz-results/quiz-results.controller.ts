import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { QuizResultsService } from './quiz-results.service';
import { CreateQuizResultDto } from './dto/create-quiz-result.dto';
import { QueryOptions } from 'src/decorators/query-options.decorator';
import { QueryOptionsDto } from 'src/dto/query-options.dto';
import { Admin, AuthGuard, Public } from 'src/auth/auth.guard';

@Admin()
@UseGuards(AuthGuard)
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
    console.log(options)
    return this.quizResultsService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quizResultsService.findOne(id);
  }
}

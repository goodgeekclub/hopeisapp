import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { isValidObjectId } from 'mongoose';
import { QuizesInterceptor } from './quizes.interceptor';

@Controller('quizes')
export class QuizesController {
  constructor(private service: QuizesService) {}

  @Get()
  list() {
    return this.service.list();
  }

  @Post()
  create(@Body() body: CreateQuizDto) {
    return this.service.create(body);
  }

  @Get(':id')
  @UseInterceptors(QuizesInterceptor)
  async get(@Param('id') id) {
    return this.service.get(id);
  }

  @Patch(':id')
  @UseInterceptors(QuizesInterceptor)
  async update(@Param('id') id, @Body() body: UpdateQuizDto) {
    return this.service.update(id, body);
  }
}

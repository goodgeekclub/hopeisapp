import { BadRequestException, Body, Controller, Get, NotFoundException, Param, Patch, Post, UseInterceptors } from '@nestjs/common';
import { QuizesService } from './quizes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizesInterceptor } from './quizes.interceptor';
import { ApiOperation, ApiResponseProperty, ApiTags } from '@nestjs/swagger';
import { Quiz } from 'src/schemas/quiz.schema';

@ApiTags('Quizes')
@Controller('quizes')
export class QuizesController {
  constructor(private service: QuizesService) {}

  @Get()
  @ApiOperation({ summary: 'List all quized' })
  list() {
    return this.service.list();
  }

  @Post()
  @ApiOperation({ summary: 'Create new quiz' })
  create(@Body() body: CreateQuizDto) {
    return this.service.create(body);
  }

  @Get(':id')
  @UseInterceptors(QuizesInterceptor)
  @ApiOperation({ summary: 'Retrieve quiz by id' })
  async get(@Param('id') id) {
    return this.service.get(id);
  }

  @Patch(':id')
  @UseInterceptors(QuizesInterceptor)
  @ApiOperation({ summary: 'Update quiz by id' })
  @ApiResponseProperty({ type: Quiz })
  async update(@Param('id') id, @Body() body: UpdateQuizDto): Promise<Quiz> {
    return this.service.update(id, body);
  }
}

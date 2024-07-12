import { Controller, Get } from '@nestjs/common';
import { QuizesService } from './quizes.service';

@Controller('quizes')
export class QuizesController {
  constructor(private service: QuizesService) {}

  @Get()
  list() {
    return this.service.list();
  }
}

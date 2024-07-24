import { PartialType } from '@nestjs/swagger';
import { CreateQuizResultDto } from './create-quiz-result.dto';

export class UpdateQuizResultDto extends PartialType(CreateQuizResultDto) {}

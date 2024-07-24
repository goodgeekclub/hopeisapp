import { ApiExtraModels, ApiProperty, PartialType } from '@nestjs/swagger';
import { Data, DataType } from 'src/schemas/data.schema';
import {
  IsString,
  IsOptional,
  ValidateNested,
  IsObject,
  Equals,
} from 'class-validator';
import { Quiz } from 'src/models/quiz.model';
import { Type } from 'class-transformer';
import { CreateDataDto } from '../create-data.dto';

@ApiExtraModels(Data)
export class CreateQuizDto  extends CreateDataDto {
  @Equals('QUIZ')
  @ApiProperty({ example: 'STAT' })
  type: DataType.quizes;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Quiz)
  data: Quiz;
}

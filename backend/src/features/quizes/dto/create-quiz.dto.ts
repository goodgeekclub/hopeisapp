import { ApiExtraModels, ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Choice, Question, Quiz } from "src/schemas/quiz.schema";

@ApiExtraModels(Quiz)
export class CreateQuizDto  extends PartialType(Quiz) {
  @IsString()
  @ApiProperty({ example: 'example' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'this is example quiz' })
  description?: string;

  @ValidateNested({ each: true })
  @Type(() => Question)
  @ApiProperty({ example: [ { id: 1, title: 'hello world', choices: [ { title: 'a', score: 1 } ] } ] })
  questions: Question[];
}

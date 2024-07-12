import { PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString, ValidateNested } from "class-validator";
import { Question, Quiz } from "src/schemas/quiz.schema";

export class CreateQuizDto  extends PartialType(Quiz) {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @ValidateNested({ each: true })
  @Type(() => Question)
  questions: Question[];
}

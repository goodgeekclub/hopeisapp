import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsMongoId, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";
import { Character } from "src/models/character";
import { QuizResult } from "src/schemas/quiz-reult.schema";

export class CreateQuizResultDto extends PartialType(QuizResult) {
  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsString()
  displayName: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Character)
  character: Character;

  @ApiProperty()
  @IsMongoId()
  profileId: string;
}

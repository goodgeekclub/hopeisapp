import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

@ApiExtraModels()
export class Choice {
  @ApiProperty({ example: 0 })
  @IsNumber()
  idx: number;

  @ApiProperty({ example: 'A' })
  @IsString()
  title: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  score: number;

  @ApiProperty({ example: 'wisdom' })
  @IsString()
  type: string;
}

@ApiExtraModels()
export class Question {
  @ApiProperty({ example: 1 })
  @IsNumber()
  idx: number;

  @ApiProperty({ example: 'A' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'abcdefg' })
  @IsString()
  @IsOptional()
  subtitle?: string;

  @ApiProperty({ type: [Choice] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique((c) => c.idx)
  @ValidateNested()
  @Type(() => Choice)
  choices: Choice[];
}

@ApiExtraModels()
export class Quiz {
  @ApiProperty({ example: 'example' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'example' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ type: [Question] })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique((q) => q.idx)
  @ValidateNested()
  @Type(() => Question)
  questions: Question[];
}

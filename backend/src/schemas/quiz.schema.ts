import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

export class Choice {
  @ApiProperty({example: 'A' })
  title: string;

  @ApiProperty({example: 1 })
  score: number;
}

@ApiExtraModels()
export class Question {
  @ApiProperty({example: 1 })
  id: number;

  @ApiProperty({example: 'A' })
  title: string;

  @ApiProperty({type: [Choice]})
  choices: Choice[];

  @ApiProperty({example: 2, required: false })
  next?: number;
}

@Schema({
  timestamps: true
})
export class Quiz {
  @Prop({ unique: true })
  @ApiProperty({ example: 'example' })
  name: string;

  @Prop({ required: false })
  @ApiProperty({ example: 'example' })
  description?: string;

  @Prop({ type: [Question] })
  @ApiProperty({type: [Question]})
  questions: Question[];
}

export type QuizDocument = HydratedDocument<Quiz>;

export const QuizSchema = SchemaFactory.createForClass(Quiz);
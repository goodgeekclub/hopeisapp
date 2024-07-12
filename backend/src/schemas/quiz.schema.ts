import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class Choice {
  title: string;
  score: number;
}

export class Question {
  id: number;

  title: string;

  choices: Choice[];

  next?: number;
}

@Schema({
  timestamps: true
})
export class Quiz {
  @Prop({ unique: true })
  name: string;

  @Prop({ required: false })
  description?: string;

  @Prop({ type: [Question] })
  questions: Question[];
}

export type QuizDocument = HydratedDocument<Quiz>;

export const QuizSchema = SchemaFactory.createForClass(Quiz);
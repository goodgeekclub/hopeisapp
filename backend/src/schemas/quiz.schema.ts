import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export class Choice {
  title: string;
  score: number;
}

export class Question {
  id: number;

  title: string;

  choices: Choice[];

  next: number;
}

export class Quiz {
  @Prop()
  name: string;

  @Prop({ required: false })
  description: string;

  @Prop({ type: [Question] })
  questions: Question[];
}

export type QuizDocument = HydratedDocument<Quiz>;

export const QuizSchema = SchemaFactory.createForClass(Quiz);
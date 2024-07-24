import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Character } from "src/models/character.model";
import { HydratedDocument, Schema as mSchema } from "mongoose";
import { Profile } from "./profile.schema";

@Schema({
  timestamps: true,
})
export class QuizResult {
  @Prop({ name: 'quiz_score' })
  @ApiProperty()
  score: number;

  @Prop({ type: Character })
  @ApiProperty()
  character: Character;

  @Prop({ name: 'display_name' })
  @ApiProperty()
  displayName: string;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'profile' })
  @ApiProperty()
  profile: string | Profile
}

export type QuizResultDocument = HydratedDocument<QuizResult>;

export const QuizResultSchema = SchemaFactory.createForClass(QuizResult);
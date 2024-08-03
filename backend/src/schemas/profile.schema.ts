import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument, Schema as mSchema } from 'mongoose';
import { Character } from 'src/models/character.model';
import { QuizResult } from './quiz-result.schema';

@Schema()
class MetaData {
  @Prop({ required: true })
  @ApiProperty({ example: 12 })
  totalCoin: number;

  @Prop({ required: true })
  @ApiProperty({ example: 100 })
  missionSuccess: number;
}

const MetaDataSchema = SchemaFactory.createForClass(MetaData);

enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER',
}

@Schema({
  timestamps: true,
})
export class Profile {
  @Prop({ required: true })
  @ApiProperty({ example: 'display_name' })
  displayName: string;

  @Prop()
  @ApiProperty({ example: 'first_name' })
  fullName?: string;

  @Prop()
  @ApiProperty({ example: 'example@mail.com' })
  email?: string;

  @Prop({ enum: Gender })
  @ApiProperty({ example: 'FEMALE', enum: Gender })
  gender?: Gender;

  @Prop()
  @ApiProperty({ example: new Date() })
  birthday?: Date;

  @Prop({
    type: MetaDataSchema,
    required: true,
    default: { totalCoin: 0, missionSuccess: 0 },
  })
  metadata: MetaData;

  @Prop()
  @ApiProperty({ example: 'photo_url' })
  photoUrl?: string;

  @Prop()
  @ApiProperty({ example: 'firebase_id' })
  firebaseId?: string;

  @Prop({ type: Character, required: true })
  character: Character;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'quiz-results' })
  quizResult: QuizResult;
}

export type ProfileDocument = HydratedDocument<Profile>;

export const ProfileSchema = SchemaFactory.createForClass(Profile);

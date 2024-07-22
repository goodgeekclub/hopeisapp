import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';
import { Character, CharacterSchema } from './character.schema';

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
  firstName?: string;

  @Prop()
  @ApiProperty({ example: 'last_name' })
  lastName?: string;

  @Prop()
  @ApiProperty({ example: 'example@mail.com' })
  email?: string;

  @Prop({ enum: Gender })
  @ApiProperty({ example: 'FEMALE', enum: Gender })
  gender?: Gender;

  @Prop()
  @ApiProperty({ example: new Date() })
  birthday?: Date;

  @Prop()
  @ApiProperty({ example: new Date() })
  createdAt?: Date;

  @Prop()
  @ApiProperty({ example: new Date() })
  updatedAt?: Date;

  @Prop({ type: MetaDataSchema, required: true })
  metadata: MetaData;

  @Prop()
  @ApiProperty({ example: 'photo_url' })
  photoUrl?: string;

  @Prop()
  @ApiProperty({ example: 'firebase_id' })
  firebaseId?: string;

  @Prop({ type: CharacterSchema, required: true })
  character: Character;
}

export type ProfileDocument = HydratedDocument<Profile>;

export const ProfileSchema = SchemaFactory.createForClass(Profile);

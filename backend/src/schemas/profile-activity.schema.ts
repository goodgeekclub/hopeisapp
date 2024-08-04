import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Character } from 'src/models/character.model';
import { HydratedDocument, Schema as mSchema } from 'mongoose';
import { Profile } from './profile.schema';
import { Mission } from 'src/models/mission.model';

export enum ActivityStatus {
  TODO = 'TODO',
  DOING = 'DOING',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
}

@Schema({
  timestamps: true,
})
export class ProfileActivity {
  @Prop({ enum: ActivityStatus, required: true })
  @ApiProperty()
  status: ActivityStatus;

  @Prop({ type: mSchema.Types.Date, required: true })
  @ApiProperty()
  date: string;

  @Prop({ required: true })
  @ApiProperty()
  coinValue: number;

  @Prop()
  @ApiProperty()
  text?: string;

  @Prop()
  @ApiProperty()
  photoUrl: string;

  @Prop({ type: Character, required: true })
  @ApiProperty()
  character: Character;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'profile', required: true })
  @ApiProperty()
  profile: string | Profile;

  @Prop({ type: Mission, require: true })
  @ApiProperty()
  mission: Mission;
}

export type ProfileActivityDocument = HydratedDocument<ProfileActivity>;

export const ProfileActivitySchema =
  SchemaFactory.createForClass(ProfileActivity);

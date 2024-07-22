import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { Character } from "src/models/character";
import { HydratedDocument, Schema as mSchema } from "mongoose";
import { Profile } from "./profile.schema";

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
  @ApiProperty()
  status: ActivityStatus;

  @Prop({ type: mSchema.Types.Date })
  date: Date;

  @Prop()
  coin_value: number;

  @Prop()
  text: string;

  @Prop()
  photoUrl: string;

  @Prop({ type: Character })
  @ApiProperty()
  character: Character;

  @Prop({ type: mSchema.Types.ObjectId, ref: 'profile' })
  @ApiProperty()
  profile: string | Profile
}

export type ProfileActivityDocument = HydratedDocument<ProfileActivity>;

export const ProfileActivitySchema = SchemaFactory.createForClass(ProfileActivity);
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

@Schema()
class MetaData {
  @Prop({ required: true })
  @ApiProperty({ example: 12 })
  totalCoin: number;

  @Prop({ required: true })
  @ApiProperty({ example: 100 })
  missionSuccess: number;
}

@Schema()
class Character {
  @Prop({ required: true })
  @ApiProperty({ example: 'id' })
  id: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'name' })
  name: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'photo_url' })
  photoUrl: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'detail' })
  detail: string;
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
  firstName: string;

  @Prop()
  @ApiProperty({ example: 'last_name' })
  lastName: string;

  @Prop()
  @ApiProperty({ example: 'example@mail.com' })
  email: string;

  @Prop()
  @ApiProperty({ example: 'female' })
  gender: string;

  @Prop()
  @ApiProperty({ example: new Date() })
  birthday: Date;

  @Prop()
  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @Prop()
  @ApiProperty({ example: new Date() })
  updatedAt: Date;

  @Prop({ required: true })
  // @ApiProperty({ example: 'metadata' })
  metadata: MetaData;

  @Prop()
  @ApiProperty({ example: 'photo_url' })
  photoUrl: string;

  @Prop()
  @ApiProperty({ example: 'firebase_id' })
  firebaseId: string;

  @Prop({ required: true })
  // @ApiProperty({ example: 'character' })
  character: Character;
}

export type ProfileDocument = HydratedDocument<Profile>;

export const ProfileSchema = SchemaFactory.createForClass(Profile);

import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Profile {
  @Prop({ unique: true, required: true })
  @ApiProperty({ example: 'example' })
  firstName: string;

  @Prop({ required: true })
  @ApiProperty({ example: 'example' })
  lastName: string;

  @Prop({ unique: true, required: true })
  @ApiProperty({ example: 'example@mail.com' })
  email: string;
}

export type ProfileDocument = HydratedDocument<Profile>;

export const ProfileSchema = SchemaFactory.createForClass(Profile);

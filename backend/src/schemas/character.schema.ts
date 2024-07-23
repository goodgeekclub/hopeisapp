import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Character {
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

export type CharacterDocument = HydratedDocument<Character>;

export const CharacterSchema = SchemaFactory.createForClass(Character);

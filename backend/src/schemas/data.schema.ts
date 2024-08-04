import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

export enum DataType {
  missions = 'MISSION',
  stats = 'STAT',
  quizes = 'QUIZ',
  characters = 'CHARACTER',
}

@Schema({
  timestamps: true,
})
export class Data<T> {
  @Prop({ unique: true, required: true })
  @ApiProperty({ example: 'My Name' })
  name: string;

  @Prop()
  @ApiProperty({ example: 'A description' })
  description?: string;

  @Prop({ required: true, enum: DataType })
  @ApiProperty({ example: 'STAT' })
  type: DataType;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  @ApiProperty()
  data?: T;
}

export type DataDocument = HydratedDocument<Data<any>>;

export const DataSchema = SchemaFactory.createForClass(Data);

import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Data {
  @Prop({ unique: true, required: true })
  @ApiProperty({ example: 'My Name' })
  name: string;

  @Prop()
  @ApiProperty({ example: 'A description' })
  description?: string;

  @Prop({ required: true, enum: ['MISSION', 'STAT'] })
  @ApiProperty({ example: 'STAT' })
  type: 'MISSION' | 'STAT' | string;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  @ApiProperty()
  data?: any;
}

export type DataDocument = HydratedDocument<Data>;

export const DataSchema = SchemaFactory.createForClass(Data);

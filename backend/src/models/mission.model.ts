import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsNumber,
  IsString,
} from 'class-validator';

export class Mission {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsNumber()
  coinValue: number;

  @ApiProperty()
  @IsNumber()
  level: number;

  @ApiProperty()
  @IsString()
  examplePhotoUrl?: string;

  @ApiProperty()
  @IsArray()
  @ArrayMinSize(1)
  @ArrayUnique()
  characterIds: string[];
}

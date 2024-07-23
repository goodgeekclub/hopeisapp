import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ArrayMinSize, ArrayUnique, IsArray, IsEnum, IsNumber, IsString, ValidateNested } from "class-validator";
import { Character } from "./character.model";

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
  characterIds: string[]
}
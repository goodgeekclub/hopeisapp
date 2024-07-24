import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class Character {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  quote: string;

  @ApiProperty()
  @IsString()
  detail: string;

  @ApiProperty()
  @IsString()
  photoUrl: string;
}
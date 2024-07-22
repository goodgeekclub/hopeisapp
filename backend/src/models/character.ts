import { Prop } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class Character {
  @ApiProperty()
  @IsString()
  @Prop()
  name: string;

  @ApiProperty()
  @IsString()
  @Prop()
  detail: string;

  @ApiProperty()
  @IsString()
  @Prop()
  photoUrl: string;
}
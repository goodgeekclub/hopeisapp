import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsMongoId,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Character } from 'src/models/character.model';

export class CreateQuizResultDto {
  @ApiProperty()
  @IsNumber()
  score: number;

  @ApiProperty()
  @IsString()
  displayName: string;

  @ApiProperty()
  @IsObject()
  @ValidateNested()
  @Type(() => Character)
  character: Character;

  @ApiProperty()
  @IsMongoId()
  @IsOptional()
  profileId?: string;
}

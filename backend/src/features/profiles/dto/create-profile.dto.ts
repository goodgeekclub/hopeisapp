import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Profile } from 'src/schemas/profile.schema';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Character } from 'src/models/character.model';

class MetaDataDTO {
  @IsNumber()
  @ApiProperty({ example: 12 })
  totalCoin: number;

  @IsNumber()
  @ApiProperty({ example: 100 })
  missionSuccess: number;
}

class CharacterDTO {
  @IsString()
  @ApiProperty({ example: 'id' })
  id: string;

  @IsString()
  @ApiProperty({ example: 'name' })
  name: string;

  @IsString()
  @ApiProperty({ example: 'photo_url' })
  photoUrl: string;

  @IsString()
  @ApiProperty({ example: 'detail' })
  detail: string;
}

enum Gender {
  FEMALE = 'FEMALE',
  MALE = 'MALE',
  OTHER = 'OTHER',
}

@ApiExtraModels(Profile)
export class CreateProfileDto {
  @IsString()
  @ApiProperty({ example: 'display_name' })
  displayName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'first_name' })
  fullName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'example@mail.com' })
  email: string;

  @IsEnum(Gender)
  @IsOptional()
  @ApiProperty({ example: 'FEMALE', enum: Gender })
  gender?: Gender;

  @IsDateString()
  @IsOptional()
  @ApiProperty({ example: new Date() })
  birthday?: Date;

  @ValidateNested()
  @Type(() => MetaDataDTO)
  @ApiProperty({ type: MetaDataDTO })
  metadata?: MetaDataDTO;

  @IsString()
  @ApiProperty({ example: 'photo_url' })
  photoUrl: string;

  @IsString()
  @ApiProperty({ example: 'firebase_id' })
  firebaseId: string;

  @ValidateNested()
  @Type(() => CharacterDTO)
  @ApiProperty({ type: CharacterDTO })
  character: Character;

  @IsString()
  quizResult: string;
}

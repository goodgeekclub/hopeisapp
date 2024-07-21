import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Profile } from 'src/schemas/profile.schema';
import {
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

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
@ApiExtraModels(Profile)
export class CreateProfileDto {
  @IsString()
  @ApiProperty({ example: 'display_name' })
  displayName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'first_name' })
  firstName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'last_name' })
  lastName: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'example@mail.com' })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'female' })
  gender: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: new Date() })
  birthday: Date;

  @ValidateNested()
  @Type(() => MetaDataDTO)
  @ApiProperty({ type: MetaDataDTO })
  metadata: MetaDataDTO;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'photo_url' })
  photoUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'firebase_id' })
  firebaseId: string;

  @ValidateNested()
  @Type(() => CharacterDTO)
  @ApiProperty({ type: CharacterDTO })
  character: CharacterDTO;
}

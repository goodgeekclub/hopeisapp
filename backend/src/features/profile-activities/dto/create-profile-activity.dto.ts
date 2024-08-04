import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { ActivityStatus } from 'src/schemas/profile-activity.schema';

export class CreateProfileActivityDto {
  @ApiProperty()
  @IsEnum(ActivityStatus)
  @IsOptional()
  status?: ActivityStatus;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  date?: string;

  @ApiProperty()
  @IsNumber()
  coinValue: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  photoUrl?: string;

  @ApiProperty()
  @IsMongoId()
  profileId: string;

  @ApiProperty()
  @IsMongoId()
  missionId: string;
}

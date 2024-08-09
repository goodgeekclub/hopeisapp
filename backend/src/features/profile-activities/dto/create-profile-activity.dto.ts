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
  @ApiProperty({ required: false, example: ActivityStatus.PENDING })
  @IsEnum(ActivityStatus)
  @IsOptional()
  status?: ActivityStatus;

  @ApiProperty({ example: '2024-08-05' })
  @IsDate()
  @IsOptional()
  date?: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  coinValue: number;

  @ApiProperty({ required: false, example: 'my submission' })
  @IsString()
  @IsOptional()
  text?: string;

  @ApiProperty({
    required: false,
    example: 'https://dev-media.hopeis.us/example.jpg',
  })
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

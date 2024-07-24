import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsDate, IsEnum, IsMongoId, IsNumber, IsNumberString, IsOptional, IsString, IsUrl } from "class-validator";
import { ActivityStatus, ProfileActivity } from "src/schemas/profile-activity.schema";
import { Profile } from "src/schemas";

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
  @IsUrl()
  photoUrl: string;

  @ApiProperty()
  @IsMongoId()
  profile: string;
}

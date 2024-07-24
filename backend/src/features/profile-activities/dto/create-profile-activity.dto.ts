import { PartialType } from "@nestjs/swagger";
import { IsDate, IsEnum, IsMongoId, IsNumber, IsNumberString, IsOptional, IsString, IsUrl } from "class-validator";
import { ActivityStatus, ProfileActivity } from "src/schemas/profile-activity.schema";

export class CreateProfileActivityDto extends PartialType(ProfileActivity) {

  @IsEnum(ActivityStatus)
  @IsOptional()
  status?: ActivityStatus;

  @IsDate()
  @IsOptional()
  date?: string;

  @IsNumber()
  coinValue: number;

  @IsString()
  @IsOptional()
  text?: string;

  @IsUrl()
  photoUrl: string;

  @IsMongoId()
  profile: string;
}

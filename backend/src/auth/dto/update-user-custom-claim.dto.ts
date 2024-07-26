import { IsEmail, IsObject, IsOptional, IsString, ValidateIf, ValidateNested } from "class-validator";
import { UpdateCustomClaimDto } from "./update-custom-claim.dto";
import { Type } from "class-transformer";

export class UpdateUserCustomClaimDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  uid?: string;

  @Type(() => UpdateCustomClaimDto)
  @ValidateNested()
  @IsObject()
  data: UpdateCustomClaimDto
}
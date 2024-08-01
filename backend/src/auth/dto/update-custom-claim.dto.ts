import { IsArray, IsBoolean } from "class-validator";

export class UpdateCustomClaimDto {
  @IsArray()
  roles: string[];
}
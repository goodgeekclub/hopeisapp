import { IsBoolean } from "class-validator";

export class UpdateCustomClaimDto {
  @IsBoolean()
  admin: boolean;
}
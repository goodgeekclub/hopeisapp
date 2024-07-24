import { IsNumber, IsNumberString, IsOptional } from "class-validator";

export class QueryOptionsDto {
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @IsOptional()
  @IsNumberString()
  skip?: number;
}
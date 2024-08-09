import { IsArray } from 'class-validator';

export class UpdateCustomClaimDto {
  @IsArray()
  roles: string[];
}

import { IsString } from 'class-validator';

export class CreateMailDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  text: string;
}

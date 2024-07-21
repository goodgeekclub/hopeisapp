import { ApiExtraModels, ApiProperty, PartialType } from '@nestjs/swagger';
import { Profile } from 'src/schemas/profile.schema';
import { IsString } from 'class-validator';

@ApiExtraModels(Profile)
export class CreateProfileDto extends PartialType(Profile) {
  @IsString()
  @ApiProperty({ example: 'mobi' })
  firstName: string;

  @IsString()
  @ApiProperty({ example: 'le' })
  lastName: string;

  @IsString()
  @ApiProperty({ example: 'mobile@gmail.com' })
  email: string;
}
